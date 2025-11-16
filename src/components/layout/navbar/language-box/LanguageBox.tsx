import {NavDropdown} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export default function LanguageBox() {
    const {i18n, t} = useTranslation("general");
    const languages: string[] = Object.keys(i18n.options.resources ?? {})

    return (
        <NavDropdown title={t(`languages.${i18n.resolvedLanguage}`)}>
            {languages.map(language => (
                <NavDropdown.Item
                    key={language}
                    onClick={() => i18n.changeLanguage(language)}
                >
                    {t(`languages.${language}`)}
                </NavDropdown.Item>))}
        </NavDropdown>
    )
}