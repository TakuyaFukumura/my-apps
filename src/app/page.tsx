import Link from 'next/link';
import {apps, AUTHOR} from './apps/data';

export default function Home() {
    return (
        <div
            className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* 作成者情報 */}
                <div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-10 flex flex-col sm:flex-row items-center gap-4">
                    <div aria-hidden="true"
                         className="flex-shrink-0 w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-3xl">
                        👤
                    </div>
                    <div className="text-center sm:text-left">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">作成者</p>
                        <a
                            href={AUTHOR.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            {AUTHOR.name}
                        </a>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            自作アプリ一覧
                        </p>
                    </div>
                </div>

                {/* アプリ一覧 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {apps.map((app) => (
                        <div
                            key={app.id}
                            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                        >
                            {/* カード全体を覆うオーバーレイリンク（ネストなしでカード全体をクリック可能に） */}
                            <Link
                                href={`/apps/${app.id}`}
                                className="absolute inset-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                aria-label={`${app.name} の詳細を見る`}
                            />
                            <h2 className="text-lg font-bold mb-3">
                                <span
                                    className="text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                    {app.name}
                                </span>
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 flex-1 mb-4">
                                {app.shortDescription}
                            </p>
                            <div className="flex flex-col gap-2 mt-auto relative z-10">
                                {app.siteUrl && (
                                    <a
                                        href={app.siteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${app.name} のサイトを見る（新しいタブで開く）`}
                                        className="text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-colors duration-200"
                                    >
                                        サイトを見る
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
