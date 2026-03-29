import Link from "next/link";
import Image from "next/image";
import logo from "@/image/IONtech-logo.svg";

const menuItems = ["Бренды", "О компании", "Поддержка", "Контакты"];

export function SiteHeader() {
  return (
    <header className='bg-white'>
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-6 py-5'>
        <Link href='/' className='block'>
          <Image
            src={logo}
            alt='IONtech logo'
            priority
            className='h-[43px] w-[305px]'
          />
        </Link>
        <nav
          aria-label='Main menu'
          className='flex flex-wrap items-center justify-end gap-4'
        >
          {menuItems.map((item) => (
            <a
              key={item}
              href='#'
              className='rounded-md px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900'
            >
              {item}
            </a>
          ))}
          <Link
            href='/cart'
            className='rounded-md border border-black bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-black'
          >
            Корзина
          </Link>
        </nav>
      </div>
    </header>
  );
}
