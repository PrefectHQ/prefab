WITH
    dependent_packages AS
    (
        SELECT name
        FROM pypi.projects
        WHERE arrayExists(e -> (e LIKE {package_name:String} || '%') AND NOT (e LIKE '%extra ==%') AND NOT (e LIKE '%extra==%'), requires_dist) != 0 AND name != {package_name:String}
        GROUP BY name
    ),
    downloads AS
    (
        SELECT
            {max_date:String}::Date32 - toIntervalDay(dateDiff('day', date, {max_date:String}::Date32) DIV 7 * 7 + 7) AS week,
            project,
            sum(count) AS downloads
        FROM pypi.pypi_downloads_per_day
        WHERE project IN (SELECT name FROM dependent_packages)
            AND (date >= {min_date:String}::Date32) AND (date < {max_date:String}::Date32)
        GROUP BY week, project
        ORDER BY week, downloads DESC
    ),
    top_projects AS
    (
        SELECT
            project
        FROM pypi.pypi_downloads_per_day
        WHERE project IN (SELECT name FROM dependent_packages)
            AND (date >= {min_date:String}::Date32) AND (date < {max_date:String}::Date32)
        GROUP BY project
        ORDER BY sum(count) DESC
        LIMIT 20
    )
SELECT
    downloads.week AS week,
    downloads.project AS package,
    downloads.downloads AS downloads
FROM downloads
WHERE downloads.project IN (SELECT project FROM top_projects)
ORDER BY week, downloads DESC
