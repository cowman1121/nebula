import { Tab } from "@/lib/tab";
import { classDoc } from "@/lib/classes";
import { ClassWizard } from "@/lib/newclassWizard";
import {ClassPage} from "@/lib/classPage"


export const tabRender = (activeTab: string, openTabs: Tab [], classes:classDoc[]) => {
        if (activeTab === "home") return <div> Home content here </div>;
        if (activeTab === "inbox") return <div>Inbox content here</div>;
        if (activeTab === "calendar") return <div>Calendar content here</div>;
        if (activeTab === "todo") return <div>To-do content here</div>;
        
     
        const openTab = openTabs.find(tab => tab.id === activeTab);
        if (openTab?.label === "Search Bar") return <div>Search bar coming soon</div>;
        
        const classData = classes.find(c => c.id === activeTab)
        if (classData && !classData.setupComplete) return <ClassWizard classData={classData} />;
        if (classData) return <ClassPage classData={classData} />;
        
        return null;

};