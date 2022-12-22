import { GiftBagIcon, HandIcons, LogoText } from "../assets/svg-components";

export default function Leading ({ children }) {
    return (
        <>
            <GiftBagIcon />
            <LogoText />
            <h1 className="text-center text-white px-5">
                Easily send and receive cash gifts to and from loved ones.
            </h1>
            <HandIcons />
        </>
    );
}
