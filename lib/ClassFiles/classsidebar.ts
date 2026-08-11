import {classDoc} from "@/lib/classes";

export function getPublishedClasses(classes: classDoc []): classDoc []{
return classes.filter(c => c.published === true);
};

export function getUnpublishedClasses(classes: classDoc []): classDoc []{

return classes.filter(c => c.published === false);
};