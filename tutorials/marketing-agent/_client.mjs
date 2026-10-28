import { ViraClient } from "@tryvira/sdk";
export function required(name){const value=process.env[name];if(!value)throw new Error(`${name} is required`);return value;}
export const scope={organizationId:required("VIRA_ORGANIZATION_ID"),projectId:required("VIRA_PROJECT_ID"),environmentId:required("VIRA_ENVIRONMENT_ID")};
export const vira=new ViraClient({baseUrl:required("VIRA_API_URL"),apiKey:process.env.VIRA_API_KEY});
