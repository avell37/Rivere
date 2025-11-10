"use client";
import { RegistrationFields } from '../AuthFields/AuthFields';
import { FormAuthWrapper } from '@/shared/ui/custom/Forms/FormWrappers/AuthFormWrapper';
import { FormInputController } from '@/shared/ui/custom/Forms/FormControllers/FormInputController';
import { useTranslations } from 'next-intl';
import { useRegister } from '../../model/hooks/useRegister';

export const RegisterForm = () => {
    const { form, isPending, showPassword, toggleShowPassword, onSubmit } = useRegister();
    const t = useTranslations('auth.register');
    const registerFields = RegistrationFields({showPassword, toggleShowPassword, t})

    return (
        <FormAuthWrapper
            form={form}
            onSubmit={onSubmit}
            isPending={isPending}
            label={t("label")}
            buttonLabel={t("submitButton")}
            navigationLabel={t("navigationButton")}
        >
            {registerFields.map((field) => (
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
