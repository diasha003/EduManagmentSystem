import { CalendarOutlined, HomeOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';

const items: MenuItemType[] = [
    {
        key: '/home',
        icon: <HomeOutlined />,
        label: 'Home'
    },
    {
        key: '/employees',
        icon: <UserOutlined />,
        label: 'Teachers & Staff'
    },
    {
        key: '/students',
        icon: <TeamOutlined />,
        label: 'Students'
    },
    {
        key: '/calendar',
        icon: <CalendarOutlined />,
        label: 'Calendar'
    }
];

export default items;
