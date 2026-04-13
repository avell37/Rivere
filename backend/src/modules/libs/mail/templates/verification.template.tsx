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

interface VerificationTemplateProps {
    token: string;
}
export const VerificationTemplate = ({ token }: VerificationTemplateProps) => {
    return (
        <Html>
            <Head />
            <Preview>Верификация аккаунта</Preview>
            <Tailwind>
                <Body className="py-10 px-4 bg-slate-100">
                    <Container className="max-w-md mx-auto bg-white rounded-xl p-6">
                        <Heading className="text-center text-2xl font-bold mb-6">
                            Rivere
                        </Heading>
                        <Section className="text-center mb-8">
                            <Heading className="text-lg font-semibold mb-2">
                                Подтвердите вашу почту
                            </Heading>
                            <Text className="text-4xl font-bold">{token}</Text>
                            <Text className="text-gray-600">
                                Чтобы подтвердить свой адрес электронной почты,
                                пожалуйста, введите этот код в приложении
                                Rivere.
                                <br />
                                Если вы не запрашивали этот код, просто
                                проигнорируйте это письмо.
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
};
