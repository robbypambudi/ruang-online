const REGEX = {
  NUMBER: /^\d+$/,
  NUMBER_AND_DECIMAL: /^\d+(\.\d+)?$/,
  PHONE_NUMBER: /^628[1-9][0-9]{7,11}$/,
  /** @see https://github.com/colinhacks/zod/blob/ac0135e00df75abd57a93a4816fe0fdaa31e94e8/deno/lib/types.ts#L553 */
  EMAIL:
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/,

  /** @see https://gist.github.com/DebkanchanSamadder/1eb07af7d9595256535c5c71ea79d66e#just-latitude-with-optional-decimal-numbers */
  LATITUDE: /^-?([0-8]?[0-9]|90)(\.[0-9]{1,15})?$/,
  LONGITUDE: /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,15})?$/,
  USERNAME: /^[a-z0-9\-_.@]+$/,
};
export default REGEX;
