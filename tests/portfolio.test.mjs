import assert from "node:assert/strict";
import test from "node:test";
import { getFeaturedPortfolioItems, getPortfolioItem, PORTFOLIO_ITEMS } from "../build/unit-tests/portfolio.js";

test("모든 사례를 고유 ID로 조회하고 상세 콘텐츠를 제공한다", () => {
  assert.equal(PORTFOLIO_ITEMS.length, 8);
  assert.equal(new Set(PORTFOLIO_ITEMS.map(({ id }) => id)).size, PORTFOLIO_ITEMS.length);
  assert.equal(getPortfolioItem("erp-inventory")?.category, "ERP");
  assert.equal(getPortfolioItem("ad-data-research")?.category, "데이터 분석");
  for (const item of PORTFOLIO_ITEMS) {
    assert.equal(getPortfolioItem(item.id), item);
    assert.ok(item.detail?.journey.length, item.id);
    assert.ok(item.detail?.questions.length, item.id);
  }
  for (const id of ["constructor", "toString", "__proto__", "missing"]) assert.equal(getPortfolioItem(id), undefined);
});

test("홈 카드 데이터가 상세 화면에 연결할 ID와 요약 정보를 전달한다", () => {
  const featured = getFeaturedPortfolioItems();
  assert.equal(featured.length, 4);
  for (const item of featured) {
    assert.equal(getPortfolioItem(item.id)?.title, item.title);
    assert.equal(Object.hasOwn(item, "detail"), false);
  }
});
