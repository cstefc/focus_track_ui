import {NavDropdown} from "react-bootstrap";
import {useTheme} from "@/components/layout/theme/ThemeContext";
import {useTranslation} from "react-i18next";
import {themes} from "@/config/themes";

export default function ThemeBox() {
    const {theme, setTheme} = useTheme()
    const {t} = useTranslation("general");
    return (
        <NavDropdown title={t(`theme.${theme}`)}>
            {themes.map(option => {
                if (option === theme) return null;
                return (
                    <NavDropdown.Item
                        key={option}
                        onClick={() => setTheme(option)}
                    >
                        {t(`theme.${option}`)}
                    </NavDropdown.Item>)
            })}
        </NavDropdown>
    )
}
