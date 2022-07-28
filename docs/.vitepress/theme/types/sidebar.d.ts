export type Sidebar = SidebarGroup[] | SidebarMulti

export interface SidebarMulti {
    [path: string]: SidebarGroup[]
}

export interface SidebarGroup {
    text?: string
    items?: SidebarItem[]
    link?: string
    /**
     * If `true`, toggle button is shown.
     *
     * @default false
     */
    collapsible?: boolean

    /**
     * If `true`, collapsible group is collapsed by default.
     *
     * @default false
     */
    collapsed?: boolean
}

export interface SidebarItem {
    text: string
    link: string
}
