export type App = {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
    githubUrl: string;
    siteUrl?: string;
};

export const AUTHOR = {
    name: 'TakuyaFukumura',
    githubUrl: 'https://github.com/TakuyaFukumura',
} as const;

export const apps: App[] = [
    {
        id: 'divichart',
        name: '配当可視化アプリ',
        shortDescription: '配当金の受け取り状況をグラフで可視化するアプリです。',
        description:
            '株式や投資信託から受け取った配当金の履歴をグラフで可視化するアプリです。' +
            '銘柄ごとの配当金や年間推移を一目で確認でき、投資管理に役立てることができます。',
        githubUrl: 'https://github.com/TakuyaFukumura/divichart-next-js-app',
    },
    {
        id: 'visuasset',
        name: '資産可視化アプリ',
        shortDescription: '保有資産の内訳や推移をグラフで可視化するアプリです。',
        description:
            '保有している資産の内訳や時系列での推移をグラフで可視化するアプリです。' +
            '資産のポートフォリオ管理や資産形成の進捗確認に活用できます。',
        githubUrl: 'https://github.com/TakuyaFukumura/visuasset-next-js-app',
    },
    {
        id: 'coast-fire',
        name: 'Coast FIRE 必要資金計算アプリ',
        shortDescription: 'Coast FIRE達成に必要な現時点での資金を計算するアプリです。',
        description:
            'Coast FIREとは、現時点で十分な資産を持っていれば、' +
            'その後は運用益のみで将来の目標資産額に到達できる状態を指します。' +
            'このアプリでは、目標退職年齢・目標資産額・期待利回りなどのパラメータを入力することで、' +
            'Coast FIRE達成に必要な現時点での資金を計算します。',
        githubUrl: 'https://github.com/TakuyaFukumura/coast-fire-next-js-app',
    },
    {
        id: 'blog',
        name: 'ブログアプリ',
        shortDescription: 'Markdown形式のファイルをブログ記事として表示するアプリです。',
        description:
            'Markdown形式（.md）で書かれたファイルをブログ記事として表示するアプリです。' +
            '記事の一覧表示や個別記事の表示に対応しており、' +
            'シンプルなブログプラットフォームとして利用できます。',
        githubUrl: 'https://github.com/TakuyaFukumura/blog-next-js-app',
    },
];
