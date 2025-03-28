"use client";

import { useTranslation } from "react-i18next";

// import styles from "./OurProduct2.module.css";

import { FormGroup, Input, InputGroup, InputGroupText, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import React, { useEffect, useState } from "react";
import NewsItemWidget from "@/components/news/NewsItemWidget";
import ApiService from "@/services/api-service";

export default function NewsContent() {
  const { t, i18n } = useTranslation(["news"]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [data, setData] = useState<any[]>([]);
  const [allData, setAllData] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [years, setYears] = useState<number[]>([]);

  const [searchCriteria, setSearchCriteria] = useState({
    text: "",
    category: "",
    year: "",
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(count / itemsPerPage);

  const filterData = (data: any[], criteria: { text: string; category: string; year: string }) => {
    if (criteria.text.length === 0 && criteria.category.length === 0 && criteria.year.length === 0) {
      return data;
    }
    return data.filter((item) => {
      const textMatch = item.topic[i18n.language].toLowerCase().includes(criteria.text.toLowerCase()) || item.context[i18n.language].toLowerCase().includes(criteria.text.toLowerCase());
      const categoryMatch = criteria.category ? item.category.toLowerCase() === criteria.category.toLowerCase() : true;
      const yearMatch = criteria.year ? new Date(item.news_datetime).getFullYear().toString() === criteria.year : true;
      return textMatch && categoryMatch && yearMatch;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp: any[] = await ApiService.getNews();
      setAllData(resp);
      setCount(resp.length);
      setCategories([...new Set(resp.map((r: any) => r.category))].sort());
      setYears([...new Set(resp.map((r: any) => new Date(r.news_datetime).getFullYear()))].sort((a, b) => b - a));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = filterData(allData, searchCriteria);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);
    setData(paginatedData);
  }, [currentPage, allData, searchCriteria]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value,
    });
    setCurrentPage(1);
  };

  return (
    <>
      <div className="background-new">
        <div className={`container py-5`}>
          <div className={`row my-5`}>
            <div className={`col-12`}>
              <p className="text-header-eng-new text-center">News and Events</p>
              <h1 className="text-header-big">{t("H_1")}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="background-platform ">
        <div className={`container py-5 max-width-1140`}>
          <div className="row">
            <div className="col-12 col-lg-4 mt-3">
              <InputGroup>
                <InputGroupText>
                  <i className="bi bi-search"></i>
                </InputGroupText>
                <Input placeholder={`${t("H_2")}`} type="text" name="text" value={searchCriteria.text} onChange={handleChange} />
              </InputGroup>
            </div>
            <div className="col-3 d-none d-lg-block"></div>
            <div className="col-12 col-lg-5 mt-3">
              <FormGroup className="d-flex gap-2 flex-column flex-lg-row normal-form">
                <Input id="categorySelect" name="category" type="select" value={searchCriteria.category} onChange={handleChange} >
                  <option value={``}>{t("H_7")}</option>
                  {categories.map((c, i) => (
                    <option key={i} value={c.toString()}>
                      {c}
                    </option>
                  ))}
                </Input>
                <Input id="yearSelect" name="year" type="select" value={searchCriteria.year} onChange={handleChange} className="w-25">
                  <option value={``}>{t("H_6")}</option>
                  {years.map((y, i) => (
                    <option key={i} value={y}>
                      {y + (i18n.language === "th" ? 543 : 0)}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
          </div>
          <div className="row">
            {data.map((d) => (
              <NewsItemWidget {...d} key={d.news_uid}></NewsItemWidget>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-5">
            <Pagination aria-label="Page navigation example">
              <PaginationItem disabled={currentPage <= 1}>
                <PaginationLink first onClick={() => handlePageChange(1)} />
              </PaginationItem>
              <PaginationItem disabled={currentPage <= 1}>
                <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem active={index + 1 === currentPage} key={index}>
                  <PaginationLink onClick={() => handlePageChange(index + 1)}>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem disabled={currentPage >= totalPages}>
                <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
              </PaginationItem>
              <PaginationItem disabled={currentPage >= totalPages}>
                <PaginationLink last onClick={() => handlePageChange(totalPages)} />
              </PaginationItem>
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
}
