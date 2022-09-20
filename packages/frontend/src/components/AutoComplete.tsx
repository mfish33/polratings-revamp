import { useCallback, useRef, useState } from "react";
import { useCombobox } from "downshift";
import { useVirtualizer } from "@tanstack/react-virtual";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTailwindBreakpoint } from "@/hooks";

export interface AutoCompleteOption<U> {
    label: string;
    value: U;
}

export interface AutoCompleteProps<T, U> {
    onChange: (val: { inputValue: string; selection?: U }) => void;
    filterFn: (items: T[], inputValue: string) => AutoCompleteOption<U>[];
    items: T[];
    placeholder: string;
    label: string;
    value: string;
    className?: string;
    disableDropdown: boolean;
}
// TODO: Fix virtualization on large screen

export function AutoComplete<T, U>({
    placeholder,
    filterFn,
    items,
    onChange: parentOnChange,
    className = "",
    disableDropdown,
    label,
}: AutoCompleteProps<T, U>) {
    const [filteredItems, setFilteredItems] = useState(filterFn(items, ""));
    const listRef = useRef(undefined as unknown as HTMLElement);

    const rowVirtualizer = useVirtualizer({
        estimateSize: useCallback(() => 28, []),
        count: filteredItems.length,
        getScrollElement: () => listRef.current,
        overscan: 2,
    });

    // Disable autocomplete on small devices
    const deviceSupportsDropdown = useTailwindBreakpoint({ md: true }, false);

    const {
        isOpen,
        getMenuProps,
        getInputProps,
        getComboboxProps,
        highlightedIndex,
        getItemProps,
    } = useCombobox({
        onInputValueChange({ inputValue }) {
            const filteredItems = filterFn(items, inputValue ?? "");
            setFilteredItems(filteredItems);
            parentOnChange({
                inputValue: inputValue ?? "",
            });
        },
        onSelectedItemChange({ selectedItem, inputValue }) {
            if (selectedItem) {
                parentOnChange({
                    inputValue: inputValue ?? "",
                    selection: selectedItem.value,
                });
            }
        },
        items: filteredItems,
        itemToString(item) {
            return item ? item.label : "";
        },
        onHighlightedIndexChange({ highlightedIndex }) {
            rowVirtualizer.scrollToIndex(highlightedIndex ?? 0);
        },
    });
    return (
        <div className={`relative ${className}`} {...getComboboxProps()}>
            <MagnifyingGlassIcon
                className="py-1 h-full absolute right-2 top-1/2 transform -translate-y-1/2"
                strokeWidth={2}
            />

            <input
                aria-label={label}
                className="border-2 border-black p-2 w-full h-full rounded"
                type="text"
                placeholder={placeholder}
                {...getInputProps()}
            />

            <ul
                {...getMenuProps({ ref: listRef })}
                className="absolute top-full left-0 w-full bg-white shadow-xl max-h-28 overflow-y-auto"
            >
                {isOpen && !disableDropdown && deviceSupportsDropdown && (
                    <div style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
                        {rowVirtualizer.getVirtualItems().map((virtualElement) => {
                            const item = filteredItems[virtualElement.index];
                            return (
                                <li
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={`${item.label}${virtualElement.index}`}
                                    className={`pl-1 ${
                                        highlightedIndex === virtualElement.index
                                            ? "bg-gray-300"
                                            : ""
                                    }`}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: `${virtualElement.size}px`,
                                        transform: `translateY(${virtualElement.start}px)`,
                                    }}
                                    {...getItemProps({ item, index: virtualElement.index })}
                                >
                                    {item.label}
                                </li>
                            );
                        })}
                    </div>
                )}
            </ul>
        </div>
    );
}
