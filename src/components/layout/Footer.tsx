"use client";

import { CATEGORY_LABELS } from "@/constants/category";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-12 w-full">
      <div className="w-full px-6">
        {/* 상단: 섹션 분리 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-8">
          {/* 브랜드 소개 */}
          <div className="space-y-3">
            <h3 className="text-white text-xl font-bold">TIO</h3>
            <p>트렌디한 패션과 라이프스타일을 제안하는 온라인 쇼핑몰입니다.</p>
          </div>

          {/* 쇼핑 카테고리 */}
          <div>
            <h4 className="text-white font-semibold mb-4">쇼핑</h4>
            <ul className="space-y-2">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <li key={key}>
                  <a
                    href={`/category/${key}`}
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 고객 서비스 */}
          <div>
            <h4 className="text-white font-semibold mb-4">고객센터</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  공지사항
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  자주 묻는 질문
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  1:1 문의
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  배송조회
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단: 저작권 */}
        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          <p>© 2025 TIO ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
