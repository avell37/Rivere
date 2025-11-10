"use client";
import { LoginFields } from '../AuthFields/AuthFields';
import { FormAuthWrapper } from '@/shared/ui/custom/Forms/FormWrappers/AuthFormWrapper';
import { FormInputController } from '@/shared/ui/custom/Forms/FormControllers/FormInputController';
import { useTranslations } from 'next-intl';
import { useLogin } from '../../model/hooks/useLogin';

export const LoginForm = () => {
    const { form, isPending, showPassword, toggleShowPassword, onSubmit } = useLogin();
    const t = useTranslations('auth.login');
    const loginFields = LoginFields({showPassword, toggleShowPassword, t})

    return (
        <FormAuthWrapper
            form={form}
            onSubmit={onSubmit}
            isPending={isPending}
            label={t("label")}
            buttonLabel={t("submitButton")}
            navigationLabel={t("navigationButton")}
        >
            {loginFields.map((field) => (
                <FormInputController
                    key={field.name}
                    {...field}
                    control={form.control}
                    label={field.label}
                    className="pl-8 custom-input"
                />
            ))}
        </FormAuthWrapper>
    )
}
