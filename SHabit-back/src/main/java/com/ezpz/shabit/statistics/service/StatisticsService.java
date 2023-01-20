package com.ezpz.shabit.statistics.service;

import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.statistics.entity.Statistics;
import com.ezpz.shabit.statistics.entity.Grass;
import com.ezpz.shabit.statistics.dto.req.DailyReqDto;

import java.util.List;

public interface StatisticsService {
    List<Daily> getTodayData(String email);
    List<Statistics> getWeeklyData(String email, int page);
    List<Statistics> getMonthlyData(String email, int page);
    List<Grass> getGrassData(String email);
    int insertTodayData(List<DailyReqDto> data, String email);
}
