import Link from "next/link";
import Image from "next/image";
import logo from "@/image/IONtech-logo.svg";

const footerColumns = [
  ["О компании", "Контакты", "Вакансии", "Новости"],
  ["Доставка", "Оплата", "Возврат", "Гарантия"],
  [
    "Для партнеров",
    "Оптовая торговля",
    "Партнерская программа",
    "Публичная оферта",
  ],
];

export function SiteFooter() {
  return (
    <footer className='mt-16 bg-black text-white'>
      <div className='mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 md:grid-cols-4'>
        {footerColumns.map((column, idx) => (
          <ul key={idx} className='space-y-3'>
            {column.map((item) => (
              <li key={item} className='text-sm text-zinc-200'>
                {item}
              </li>
            ))}
          </ul>
        ))}
        <div className='flex items-end'>
          <Link href='/' className='block'>
            <Image
              src={logo}
              alt='IONtech logo'
              className='invert h-[43px] w-[305px]'
              priority={false}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
