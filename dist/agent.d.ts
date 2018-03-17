/**
 * Interface Promise should resolve.
 *
 * ```js
 * {
 *  message: string
 * }
 * ```
 */
export interface ResponseObject {
    message: string;
}
export interface AgentConfig {
    directlineSecret?: string;
    botUrl?: string;
}
export declare function makeAgent({directlineSecret, botUrl}: AgentConfig): (call: () => Promise<ResponseObject>) => void;
