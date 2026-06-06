import {format} from "date-fns";
import { PostRecord } from "../../types";
const  formatPostDatetime = (datetime: Date): string => {
    
    const formatted = format(datetime, 'MMMM d yyyy   h:m aaa');
    return formatted;
}

const formatPosts = (posts: PostRecord[]) => {
    posts.forEach((post) => {
        (post.createdAt as any) = formatPostDatetime(post.createdAt);
    })
}



export default formatPosts;