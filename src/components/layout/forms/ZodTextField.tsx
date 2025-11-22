import {TextField} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import {FieldError, FieldValues, Path, UseFormRegister} from "react-hook-form";

export interface ZodTextFieldProps<T extends FieldValues> {
    translation_scope: string;
    item: Path<T>;
    itemKey: string;
    register: UseFormRegister<T>;
    errors?: FieldError;
}

export function ZodTextField<T extends FieldValues>({
                                                        translation_scope,
                                                        item,
                                                        itemKey,
                                                        register,
                                                        errors
                                                    }: ZodTextFieldProps<T>) {
    const {t} = useTranslation(translation_scope);
    return (
        <TextField
            onClick={(e) => {
                e.stopPropagation()
            }}
            onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }}
            margin="normal"
            label={t(`forms.${itemKey}Label`)}
            placeholder={t(`forms.${itemKey}Placeholder`)}
            {...register(item)}
            error={!!errors}
            helperText={errors?.message}
            fullWidth
        />
    );
}
