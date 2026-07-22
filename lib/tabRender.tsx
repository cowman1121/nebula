import { Tab } from "@/lib/tab";


export const tabRender = (activeTab: string, openTabs: Tab []) => {
        if (activeTab === "home") return <div> Home content here </div>;
        if (activeTab === "inbox") return <div>Inbox content here</div>;
        if (activeTab === "calendar") return <div>Calendar content here</div>;
        if (activeTab === "todo") return <div>To-do content here</div>;

        const openClass = openTabs.find(tab => tab.id === activeTab);
        if (openClass?.isNew) return <div> New class setup for: {openClass.label}</div>;
        if (openClass) return <div>Class viewer for: {openClass.label}</div>;

        return null;

};