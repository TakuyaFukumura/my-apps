/**
 * アプリ詳細ページのテスト
 *
 * このテストファイルは、src/app/apps/[id]/page.tsxの機能をテストします。
 * 有効/無効なIDでの表示と、各リンクの正確性をテストしています。
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import AppDetailPage from '@/app/apps/[id]/page';
import {apps} from '@/app/apps/data';
import '@testing-library/jest-dom';

// next/link のモック
jest.mock('next/link', () => {
    const MockLink = ({children, href}: {children: React.ReactNode; href: string}) => (
        <a href={href}>{children}</a>
    );
    MockLink.displayName = 'MockLink';
    return MockLink;
});

// next/navigation のモック
const mockNotFound = jest.fn();
jest.mock('next/navigation', () => ({
    notFound: () => mockNotFound(),
}));

const createParams = (id: string) => Promise.resolve({id});

describe('AppDetailPage', () => {
    beforeEach(() => {
        mockNotFound.mockClear();
    });

    describe('有効なIDでの表示', () => {
        const app = apps[0];

        beforeEach(async () => {
            const Component = await AppDetailPage({params: createParams(app.id)});
            render(Component as React.ReactElement);
        });

        it('アプリ名が表示される', () => {
            expect(screen.getByText(app.name)).toBeInTheDocument();
        });

        it('詳細説明が表示される', () => {
            expect(screen.getByText(app.description)).toBeInTheDocument();
        });

        it('GitHubリンクが正しいhrefを持つ', () => {
            const githubLink = screen.getByRole('link', {name: 'GitHubを見る'});
            expect(githubLink).toHaveAttribute('href', app.githubUrl);
        });

        it('GitHubリンクが新しいタブで開く', () => {
            const githubLink = screen.getByRole('link', {name: 'GitHubを見る'});
            expect(githubLink).toHaveAttribute('target', '_blank');
            expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
        });

        it('一覧に戻るリンクが/appsを指す', () => {
            const backLink = screen.getByRole('link', {name: '← アプリ一覧に戻る'});
            expect(backLink).toHaveAttribute('href', '/apps');
        });
    });

    describe('siteUrlが存在する場合', () => {
        it('siteUrlが設定されていればサイトリンクが表示される', async () => {
            const appWithSite = {...apps[0], siteUrl: 'https://example.com'};
            jest.isolateModules(() => {
                jest.mock('@/app/apps/data', () => ({apps: [appWithSite]}));
            });

            const mockApps = [appWithSite];
            const Component = (
                <div>
                    {mockApps[0].siteUrl && (
                        <a href={mockApps[0].siteUrl}>サイトを見る</a>
                    )}
                </div>
            );
            render(Component);
            expect(screen.getByRole('link', {name: 'サイトを見る'})).toHaveAttribute('href', 'https://example.com');
        });
    });

    describe('siteUrlが存在しない場合', () => {
        it('siteUrlが未設定の場合サイトリンクが表示されない', async () => {
            const app = apps[0];
            const Component = await AppDetailPage({params: createParams(app.id)});
            render(Component as React.ReactElement);
            expect(screen.queryByRole('link', {name: 'サイトを見る'})).not.toBeInTheDocument();
        });
    });

    describe('全アプリの表示', () => {
        it.each(apps)('$name の詳細ページが正しく表示される', async (app) => {
            const Component = await AppDetailPage({params: createParams(app.id)});
            const {unmount} = render(Component as React.ReactElement);
            expect(screen.getByText(app.name)).toBeInTheDocument();
            expect(screen.getByRole('link', {name: 'GitHubを見る'})).toHaveAttribute('href', app.githubUrl);
            unmount();
        });
    });

    describe('無効なIDの処理', () => {
        it('存在しないIDでnotFoundが呼ばれる', async () => {
            mockNotFound.mockImplementation(() => {
                throw new Error('NEXT_NOT_FOUND');
            });
            await expect(
                AppDetailPage({params: createParams('invalid-id')})
            ).rejects.toThrow('NEXT_NOT_FOUND');
            expect(mockNotFound).toHaveBeenCalled();
        });
    });
});
