import { Link } from "react-router-dom";
import star from "@/assets/star.svg";
import { inferQueryOutput } from "@/trpc";

interface TeacherCardProps {
    teacher: inferQueryOutput<"allProfessors">[0] | null;
}

export const TEACHER_CARD_HEIGHT_REM = 10;

export function TeacherCard({ teacher }: TeacherCardProps) {
    return (
        <Link to={`/professor/${teacher?.id}`}>
            <div
                // eslint-disable-next-line max-len
                className="w-full h-32 border-cal-poly-gold border-4 bg-white flex justify-between items-center text-cal-poly-green cursor-pointer"
                style={{ borderRadius: "1.5rem" }}
            >
                <h3 className="text-3xl font-medium pl-3">
                    {teacher?.lastName}, {teacher?.firstName}
                </h3>
                <div className="text-right text-xl pr-3 font-medium flex-shrink-0">
                    <div>{teacher?.department}</div>
                    <div className="flex items-center justify-end">
                        <img className="pr-1 h-4" src={star} alt="" />
                        <div>{teacher?.overallRating.toFixed(2)}</div>
                    </div>
                    <div>{teacher?.numEvals} evals</div>
                </div>
            </div>
        </Link>
    );
}
