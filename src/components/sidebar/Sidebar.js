import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as ImIcons from "react-icons/im";
import * as MdIcons from "react-icons/md";

export const Sidebar = [

    {
        title : 'DASHBOARDS',
        path: '/',
        icon: <MdIcons.MdSpaceDashboard />,
        cName: 'nav-text'
    },
    
    {
        title : 'Admin Dashboard',
        path: '/admin',
        icon: <ImIcons.ImUserTie />,
        cName: 'nav-text'
    },

    {
        title : 'Allowance Dashboard',
        path: '/lead',
        icon: <BiIcons.BiSpreadsheet/>,
        cName: 'nav-text'
    },

    {
        title : 'Developer Dashboard',
        path: '/developer',
        icon: <AiIcons.AiTwotoneTool />,
        cName: 'nav-text'
    },

    {
        title : 'Employee Dashboard',
        path: '/employee',
        icon: <FaIcons.FaUserAlt />,
        cName: 'nav-text'
    },

    
    {
        title : 'Logout',
        path: '/logout',
        icon: <AiIcons.AiOutlineLogout />,
        cName: 'nav-text'
    }




];
