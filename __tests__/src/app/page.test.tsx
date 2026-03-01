/**
 * トップページのテスト
 *
 * このテストファイルは、src/app/page.tsxの機能をテストします。
 * アプリ一覧の表示と作成者情報の表示をテストしています。
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import Home from '@/app/page';
import {apps, AUTHOR} from '@/app/apps/data';
import '@testing-library/jest-dom';

// next/link のモック
jest.mock('next/link', () => {
    const MockLink = ({children, href, ...rest}: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
        <a href={href} {...rest}>{children}</a>
    );
    MockLink.displayName = 'MockLink';
    return MockLink;
});

// next/navigation のモック
jest.mock('next/navigation', () => ({
    useRouter: () => ({push: jest.fn()}),
}));

describe('Home', () => {
    beforeEach(() => {
        render(<Home/>);
    });

    describe('作成者情報', () => {
        it('作成者名が表示される', () => {
            expect(screen.getByText(AUTHOR.name)).toBeInTheDocument();
        });

        it('作成者のGitHubリンクが表示される', () => {
            const link = screen.getByRole('link', {name: AUTHOR.name});
            expect(link).toHaveAttribute('href', AUTHOR.githubUrl);
        });

        it('「作成者」ラベルが表示される', () => {
            expect(screen.getByText('作成者')).toBeInTheDocument();
        });

        it('「自作アプリ一覧」ラベルが表示される', () => {
            expect(screen.getByText('自作アプリ一覧')).toBeInTheDocument();
        });
    });

    describe('アプリ一覧', () => {
        it('全アプリのタイルが表示される', () => {
            apps.forEach((app) => {
                expect(screen.getByText(app.name)).toBeInTheDocument();
            });
        });

        it('各アプリの簡易説明が表示される', () => {
            apps.forEach((app) => {
                expect(screen.getByText(app.shortDescription)).toBeInTheDocument();
            });
        });

        it('各アプリにデプロイ先リンクが表示される', () => {
            const siteLinks = screen.getAllByRole('link', {name: /のサイトを見る/});
            const appsWithSiteUrlCount = apps.filter((app) => app.siteUrl).length;
            expect(siteLinks).toHaveLength(appsWithSiteUrlCount);
        });

        it('各アプリのデプロイ先リンクが正しいhrefを持つ', () => {
            apps.forEach((app) => {
                if (app.siteUrl) {
                    const siteLinks = screen.getAllByRole('link', {name: /のサイトを見る/});
                    const siteLink = siteLinks.find((l) => l.getAttribute('href') === app.siteUrl);
                    expect(siteLink).toBeInTheDocument();
                }
            });
        });

        it('各アプリのデプロイ先リンクにaria-labelが設定される', () => {
            apps.forEach((app) => {
                if (app.siteUrl) {
                    const siteLink = screen.getByRole('link', {
                        name: `${app.name} のサイトを見る（新しいタブで開く）`,
                    });
                    expect(siteLink).toBeInTheDocument();
                }
            });
        });

        it('各アプリ名が表示される', () => {
            apps.forEach((app) => {
                expect(screen.getByText(app.name)).toBeInTheDocument();
            });
        });

        it('各カードに詳細ページへのオーバーレイリンクが存在する', () => {
            apps.forEach((app) => {
                const overlayLink = screen.getByRole('link', {
                    name: `${app.name} の詳細を見る`,
                });
                expect(overlayLink).toHaveAttribute('href', `/apps/${app.id}`);
            });
        });

        it('「詳細を見る →」リンクが表示されない', () => {
            const detailLinks = screen.queryAllByText('詳細を見る →');
            expect(detailLinks).toHaveLength(0);
        });
    });
});
