const prefix = '/images/menu/';
const prefix_bottom = '/icons/bottomMenu/';
const prefix_profile = '/images/menuProfile/';

export const TAB_MENU = [
    {
        title: 'Игры',
        icon: prefix + 'games.webp',
        url: '/catalog'
    },
    {
        title: 'Сервисы',
        icon: prefix + 'services.webp',
        url: '/catalog'
    },
    {
        title: 'Софт',
        icon: prefix + 'soft.webp',
        url: '/catalog'
    }
]

export const BOTTOM_MENU = [
    {
        title: 'Main',
        icon: prefix_bottom + 'main.svg',
        url: '/main'
    },
    {
        title: 'Catalog',
        icon: prefix_bottom + 'catalog.svg',
        url: '/catalog'
    },
    {
        title: 'Cart',
        icon: prefix_bottom + 'cart.svg',
        url: '/cart'
    },
    {
        title: 'Profile',
        icon: prefix_bottom + 'profile.svg',
        url: '/profile'
    }
]

export const PROFILE_MENU = [
    {
        title: 'Задания',
        desc: 'Получай монеты',
        icon: prefix_profile + 'tasks.webp',
        url: '/profile/tasks'
    },
    {
        title: 'Пригласи друга',
        desc: 'Получай монеты',
        icon: prefix_profile + 'invite.webp',
        url: '/profile/invite'
    },
]