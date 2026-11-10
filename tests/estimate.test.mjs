import assert from "node:assert/strict";
import test from "node:test";
import { SERVICES } from "../build/unit-tests/constants.js";
import {
  computeRange, createEstimateState, getEstimateContactDetails, getEstimateContactHref, normalizeServiceId,
} from "../build/unit-tests/estimate.js";

test("모든 서비스 ID와 기존 주소의 ID가 동일한 견적을 연다", () => {
  for (const service of SERVICES) {
    if (service.estimate === null) {
      assert.equal(normalizeServiceId(service.id), "");
      assert.deepEqual(getEstimateContactDetails(new URLSearchParams({ purpose: service.id })), [
        { label: "제작 유형", value: service.title },
      ]);
      continue;
    }
    assert.equal(normalizeServiceId(service.id), service.id);
    assert.equal(normalizeServiceId(service.estimate.legacyId), service.id);
    const range = computeRange(createEstimateState(service.id));
    assert.equal(range.min, service.priceFrom);
    assert.equal(range.max, service.estimate.max + 50);
  }
  assert.equal(normalizeServiceId(null), "");
  assert.equal(normalizeServiceId("constructor"), "");
});

test("견적에서 선택한 유형, 옵션, 금액을 상담 요약에 표시한다", () => {
  const state = {
    ...createEstimateState("corporate-website"),
    designLevel: "premium",
    hasAdmin: true,
    hasMember: true,
    hasPayment: true,
    hasReservation: true,
    features: ["seo", "analytics"],
    timeline: "urgent",
    budget: "500-1000",
  };
  const url = new URL(getEstimateContactHref(state), "https://example.test");
  assert.equal(url.pathname, "/contact");
  assert.deepEqual(getEstimateContactDetails(url.searchParams), [
    { label: "제작 유형", value: "기업 홈페이지" },
    { label: "디자인", value: "프리미엄" },
    { label: "선택 기능", value: "관리자 페이지, 회원가입 / 로그인, 결제 기능, 예약 기능, SEO 최적화, GA4 / 통계" },
    { label: "희망 일정", value: "1개월 이내" },
    { label: "예산", value: "500~1000만원" },
    { label: "예상 견적", value: "680~1,180만원 (VAT 별도)" },
    { label: "예상 제작 기간", value: "3~6주" },
  ]);
});

test("서비스 페이지에서 온 상담에는 선택한 서비스만 표시한다", () => {
  const params = new URLSearchParams({ purpose: "landing", features: "unknown", designLevel: "unknown" });
  assert.deepEqual(getEstimateContactDetails(params), [{ label: "제작 유형", value: "랜딩페이지" }]);
  params.set("purpose", "unknown");
  assert.deepEqual(getEstimateContactDetails(params), []);
});
