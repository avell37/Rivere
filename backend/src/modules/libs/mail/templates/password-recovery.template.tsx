import { SessionMetadata } from '@/shared/types/session-metadata.types';
import {
    Body,
    Container,
    Head,
    Heading,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';
import { Html } from '@react-email/html';

interface PasswordRecoveryTemplateProps {
    token: string;
    metadata: SessionMetadata;
}

export function PasswordRecoveryTemplate({
    token,
    metadata,
}: PasswordRecoveryTemplateProps) {
    return (
        <Html>
            <Head />
            <Preview>Сброс пароля</Preview>
            <Tailwind>
                <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
                    <Container className="max-w-md mx-auto bg-white rounded-xl p-6">
                        <Heading className="text-center text-2xl font-bold mb-6">
                            Rivere
                        </Heading>
                        <Section className="text-center mb-8">
                            <Heading className="text-lg text-black font-bold">
                                Сброс пароля
                            </Heading>
                            <Text className="text-4xl font-bold">{token}</Text>
                            <Text className="text-black text-base mt-2">
                                Чтобы сбросить пароль для вашей учетной записи,
                                пожалуйста, введите этот код в приложении
                                Rivere.
                            </Text>
                        </Section>
                        <Section className="max-w-2xl bg-gray-100 rounded-lg p-6 mb-6">
                            <Heading className="text-xl font-semibold text-[#18B9AE]">
                                Информация о запросе:
                            </Heading>
                            <ul className="list-none text-left pl-0 text-black mt-2">
                                <li className="m-0">
                                    🌍 Расположение: {metadata.location.country}
                                    , {metadata.location.city}
                                </li>
                                <li className="m-0">
                                    📱 Операционная система:{' '}
                                    {metadata.device.os}
                                </li>
                                <li className="m-0">
                                    🌐 Браузер: {metadata.device.browser}
                                </li>
                                <li className="m-0">
                                    💻 IP-адрес: {metadata.ip}
                                </li>
                            </ul>
                            <Text className="text-gray-600 mt-2">
                                Если вы не инициировали этот запрос, пожалуйста,
                                игнорируйте это сообщение.
                            </Text>
                        </Section>
                        <Section className="text-center mt-10 pt-6 border-t border-gray-200">
                            <Text className="text-xs text-gray-500 mb-2">
                                Это письмо сформировано автоматически и не
                                требует ответа.
                            </Text>
                            <Text className="text-xs text-gray-500 mb-2">
                                Нужна помощь?{' '}
                                <Link
                                    href="mailto:help@rivere.ru"
                                    className="text-teal-500 underline"
                                >
                                    help@rivere.ru
                                </Link>
                            </Text>
                            <Text className="text-[11px] text-gray-400">
                                © 2026 Rivere. Все права защищены.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
