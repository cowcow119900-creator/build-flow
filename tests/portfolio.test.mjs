import assert from "node:assert/strict";
import test from "node:test";
import { getFeaturedPortfolioItems, getPortfolioItem, PORTFOLIO_ITEMS } from "../build/unit-tests/portfolio.js";

test("모든 사례를 고유 ID로 조회하고 상세 콘텐츠가 있는 사례를 구분한다", () => {
  assert.equal(new Set(PORTFOLIO_ITEMS.map(({ id }) => id)).size, 6);
  assert.equal(PORTFOLIO_ITEMS.filter(({ detail }) => detail).length, 2);
  for (const item of PORTFOLIO_ITEMS) assert.equal(getPortfolioItem(item.id), item);
  for (const id of ["constructor", "toString", "__proto__", "missing"]) assert.equal(getPortfolioItem(id), undefined);
});

test("홈 카드 데이터가 상세 보유 여부를 전달한다", () => {
  const featured = getFeaturedPortfolioItems();
  assert.equal(featured.length, 4);
  for (const item of featured) {
    assert.equal(item.hasDetails, Boolean(getPortfolioItem(item.id)?.detail));
    assert.equal(Object.hasOwn(item, "detail"), false);
  }
});
