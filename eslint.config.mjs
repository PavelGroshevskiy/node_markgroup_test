// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	eslintConfigPrettier,

	{
		rules: {
			"no-undef": "off",
			"@typescript-eslint/ban-types": "off",
			"@typescript-eslint/no-unused-vars": ["off"],
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/explicit-function-return-type": ["warn"],
		},
	},
);
