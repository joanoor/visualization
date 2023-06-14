
declare module '~virtual/svg-component' {
  const SvgIcon: import("vue").DefineComponent<{
      name: {
          type: import("vue").PropType<"404" | "arrow" | "avatar" | "download" | "moon" | "more" | "sc" | "sun">;
          default: string;
          required: true;
      };
  }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
      name: {
          type: import("vue").PropType<"404" | "arrow" | "avatar" | "download" | "moon" | "more" | "sc" | "sun">;
          default: string;
          required: true;
      };
  }>>, {
      name: "404" | "arrow" | "avatar" | "download" | "moon" | "more" | "sc" | "sun";
  }>;
  export default SvgIcon;
}
