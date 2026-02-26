import Link from 'next/link';
import {notFound} from 'next/navigation';
import {apps} from '../data';

type Props = {
    params: Promise<{id: string}>;
};

export default async function AppDetailPage({params}: Props) {
    const {id} = await params;
    const app = apps.find((a) => a.id === id);

    if (!app) {
        notFound();
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                    {/* 戻るリンク */}
                    <Link
                        href="/apps"
                        className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6"
                    >
                        ← アプリ一覧に戻る
                    </Link>

                    {/* アプリ名 */}
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                        {app.name}
                    </h1>

                    {/* 詳細説明 */}
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                        {app.description}
                    </p>

                    {/* リンク */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href={app.siteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-3 transition-colors duration-200"
                        >
                            サイトを見る
                        </a>
                        <a
                            href={app.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg px-6 py-3 transition-colors duration-200"
                        >
                            GitHubを見る
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
