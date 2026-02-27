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
    const MockLink = ({children, href}: { children: React.ReactNode; href: string }) => (
        <a href={href}>{children}</a>
    );
    MockLink.displayName = 'MockLink';
    return MockLink;
});

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
            const siteLinks = screen.getAllByRole('link', {name: 'サイトを見る'});
            expect(siteLinks).toHaveLength(apps.length);
        });

        it('各アプリのデプロイ先リンクが正しいhrefを持つ', () => {
            apps.forEach((app) => {
                if (app.siteUrl) {
                    const siteLinks = screen.getAllByRole('link', {name: 'サイトを見る'});
                    const siteLink = siteLinks.find((l) => l.getAttribute('href') === app.siteUrl);
                    expect(siteLink).toBeInTheDocument();
                }
            });
        });

        it('各アプリに詳細リンクが表示される', () => {
            const detailLinks = screen.getAllByRole('link', {name: /詳細を見る/});
            expect(detailLinks).toHaveLength(apps.length);
        });

        it('詳細リンクが正しいパスを持つ', () => {
            apps.forEach((app) => {
                const detailLinks = screen.getAllByRole('link', {name: '詳細を見る →'});
                const detailLink = detailLinks.find((l) => l.getAttribute('href') === `/apps/${app.id}`);
                expect(detailLink).toBeInTheDocument();
            });
        });
    });
});
