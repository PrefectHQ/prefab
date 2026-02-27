SELECT
    {max_date:String}::Date32 - toIntervalDay(dateDiff('day', date, {max_date:String}::Date32) DIV 7 * 7 + 7) AS week,
    sum(count) AS downloads
FROM pypi.pypi_downloads_per_day
WHERE project = {package_name:String}
    AND date >= {min_date:String}::Date32
    AND date < {max_date:String}::Date32
GROUP BY week
ORDER BY week
