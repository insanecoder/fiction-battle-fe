import type { Tag } from "../../types"

type TagsProp = {
    tag:Tag
}
export default function TagsComponent({tag}:TagsProp) {
    return <div className="pills mt-2" data-type={tag.type}>
        {tag.label}
    </div>
}
