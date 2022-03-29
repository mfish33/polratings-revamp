// Please do not modify this file it is generated by `generateBackendTypes.ts`
/* eslint-disable */ 

export interface PolyratingsAPIEnv {
    url: string;
}
export const DEV_ENV: PolyratingsAPIEnv = {
    url: "https://api-dev.polyratings.dev",
};
export const BETA_ENV: PolyratingsAPIEnv = {
    url: "https://api-beta.polyratings.dev",
};
export const PROD_ENV: PolyratingsAPIEnv = {
    url: "https://api-prod.polyratings.dev",
};

export const cloudflareNamespaceInformation = {
    POLYRATINGS_TEACHERS: {
        dev: "20700dd12582422b9f91a0a1695ace88",
        beta: "3a5904587fe943679bf97e59d95b7632",
        prod: "c6bf2730306a4e65bb8aa7412ae6f250",
    },
    PROCESSING_QUEUE: {
        dev: "ada7d85a6912462ebaaaed5304f58323",
        beta: "a25ee370718a4d0e86aeba48f7156618",
        prod: "845ba14e564c411fa52543408e15c53e",
    },
    POLYRATINGS_USERS: {
        dev: "67f2fa91ef8a4625afdb07bfbbf9e2dd",
        beta: "37ebe11fcc9e4a96b502e8bb9f52513f",
        prod: "a23f7444e3c34913b7f04223fd1920d3",
    },
    POLYRATINGS_TEACHER_APPROVAL_QUEUE: {
        dev: "133cd03378e64984b5d8afb702dc53d2",
        beta: "69bc139b671b4ac08c6fe7e594dad512",
        prod: "6adc0bac1438487f82de330b94684e73",
    },
    POLYRATINGS_REPORTS: {
        dev: "3f3235ea2ed3456497e65e0ed980a31a",
        beta: "ad342efbc164446fb20125d7c135625f",
        prod: "e7cdc104b5c047f498c0cc702a487bdf",
    },
} as const;

export const cloudflareAccountId = "4b59b59a6058dce1832781075d4fde9d";
