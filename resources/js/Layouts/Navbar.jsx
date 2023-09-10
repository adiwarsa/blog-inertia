import { Disclosure } from '@headlessui/react';
import { Bars2Icon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Dropdown, DropdownLink } from '@/Components/Dropdown.jsx';
import NavLink from '@/Components/NavLink.jsx';
import { Link, router, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo.jsx';
import { useEffect, useState } from 'react';
import { filters } from '@/Pages/Articles/Partials/Filter.jsx';
import { useTheme } from '@/Context/ThemeContext';

export default function Navbar() {
    const { auth, global_categories } = usePage().props;
    const [query, setQuery] = useState('');
    const { theme, toggleTheme } = useTheme();

//     useEffect(() => {
//     if (theme === "dark"){
//         document.documentElement.classList.add("dark");
//     }else{
//         document.documentElement.classList.remove("dark");
//     }
//    }, [theme]);

    function gimmeResult(e) {
        e.preventDefault();
        router.get(route('articles.search'), { search: query }, {
            preserveScroll: true,
            preserveState: true,
        })
    }
    // const handleThemeSwitch = () => {
    //     setTheme(theme === "dark" ? "light" : "dark");
    // };

    return (
        <Disclosure as="nav" className="bg-slate-300 dark:bg-gray-950">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-screen-2xl px-2 sm:px-4 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex px-2 lg:px-0">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="h-8 w-8 fill-red-500" />
                                    </Link>
                                </div>
                                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                                    {/* <NavLink href="/articles" children="Blog" /> */}
                                    <Dropdown
                                        align="right"
                                        trigger={
                                            <div className="flex items-center">
                                                <span>Articles</span>
                                                <ChevronDownIcon
                                                    className="ml-4 h-4 w-4 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        }
                                    >
                                        <div>
                                            {filters.map((filter, i) => (
                                                <DropdownLink key={i} href={filter.href}>
                                                    {filter.name}
                                                </DropdownLink>
                                            ))}
                                        </div>
                                    </Dropdown>
                                    <Dropdown
                                        align="right"
                                        trigger={
                                            <div className="flex items-center">
                                                <span>Categories</span>
                                                <ChevronDownIcon
                                                    className="ml-4 h-4 w-4 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        }
                                    >
                                        <div>
                                            {global_categories.map((category, i) => (
                                                <DropdownLink key={i} href={route('categories.show', [category])}>
                                                    {category.name}
                                                </DropdownLink>
                                            ))}
                                        </div>
                                    </Dropdown>
                                    <button onClick={toggleTheme} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                                <div className="w-full max-w-lg lg:max-w-xs">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <form onSubmit={gimmeResult} className="relative">
                                        <div className="group pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="query"
                                            name="query"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            className="block w-full rounded-md border border-gray-700 focus:border-sky-500 transition bg-gray-800 py-1.5 pl-10 pr-3 text-sm leading-6 text-white placeholder:text-gray-400 focus:bg-gray-700 focus:ring-sky-900 focus:border focus:ring focus:outline-none"
                                            placeholder="Search"
                                            type="query"
                                        />
                                    </form>
                                </div>
                            </div>
                            <div className="hidden lg:ml-4 lg:flex lg:items-center">
                                {auth.user ? (
                                    <Dropdown
                                        trigger={
                                            <>
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={auth.user.gravatar}
                                                    alt={auth.user.name}
                                                />
                                            </>
                                        }
                                    >
                                        <div className="bg-gray-50 p-4 text-gray-950">
                                            <div className="flex">
                                                <div className="mr-2 shrink-0">
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src={auth.user.gravatar}
                                                        alt={auth.user.name}
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">{auth.user.name}</h4>
                                                    <p className="text-sm text-gray-500">{auth.user.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-1">
                                            <DropdownLink href={route('dashboard')}>Dashboard</DropdownLink>
                                            <DropdownLink href={route('profile.edit')}>Profile</DropdownLink>
                                        </div>
                                        {auth.user?.is_writer && (
                                            <div className='py-1'>
                                                <DropdownLink href={route('articles.list')}>List article</DropdownLink>
                                            </div>
                                        )}
                                        <div className="py-1">
                                            <DropdownLink as="button" method="post" href={route('logout')}>
                                                Log out
                                            </DropdownLink>
                                        </div>
                                    </Dropdown>
                                ) : (
                                    <div className="ml-4 flex gap-x-8">
                                        <NavLink href="/register" children="Register" />
                                        <NavLink href="/login" children="Login" />
                                    </div>
                                )}
                            </div>
                            <div className="block lg:hidden">
                                <Dropdown
                                    trigger={
                                        <>
                                            {auth.user ? (
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={auth.user.gravatar}
                                                    alt={auth.user.name}
                                                />
                                            ) : (
                                                <Bars2Icon className="h-6 w-6 text-white" />
                                            )}
                                        </>
                                    }
                                >
                                    {auth.user ? (
                                        <>
                                            <div className="bg-gray-50 p-4 text-gray-950">
                                                <div className="flex">
                                                    <div className="mr-2 shrink-0">
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src={auth.user.gravatar}
                                                            alt={auth.user.name}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold">{auth.user.name}</h4>
                                                        <p className="text-sm text-gray-500">{auth.user.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="py-1">
                                                <DropdownLink href={route('dashboard')}>Dashboard</DropdownLink>
                                                <DropdownLink href={route('profile.edit')}>Profile</DropdownLink>
                                            </div>
                                            {auth.user?.is_writer && (
                                                <div className='py-1'>
                                                    <DropdownLink href={route('articles.list')}>List article</DropdownLink>
                                                </div>
                                            )}
                                            <div className="py-1">
                                                <DropdownLink as="button" method="post" href={route('logout')}>
                                                    Log out
                                                </DropdownLink>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="py-1">
                                                <DropdownLink href={route('login')}>Login</DropdownLink>
                                                <DropdownLink href={route('register')}>Register</DropdownLink>
                                            </div>
                                        </>
                                    )}
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    );
}