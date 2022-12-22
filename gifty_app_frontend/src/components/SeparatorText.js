import { LineIcon } from "../assets/svg-components";

export default function SeparatorText ({ width, text }) {
    return (
        <div className="flex justify-center items-center gap-2">
            <LineIcon width={width}/>
            <p className="text-white text-[13px] py-2">
                {text}
            </p>
            <LineIcon width={width}/>
        </div>
    );
}
