import React from 'react';

function extractTagsAndLinks(description) {
    const elements = [];
    let lastIndex = 0;

    // Регулярное выражение для поиска тегов, ссылок и переносов строк
    const regex = /#[\d\w]+|https:\/\/[\w./-]+|\n/g;
    let match;

    // Разбиваем строку на части и создаем элементы
    while ((match = regex.exec(description)) !== null) {
        // Добавляем текст до найденного совпадения
        if (match.index > lastIndex) {
            elements.push(description.slice(lastIndex, match.index));
        }

        const matchedText = match[0];
        if (matchedText.startsWith('#')) {
            // Создаем кнопку для тега
            elements.push(
                <button key={match.index} className="open-tag" data-tag={matchedText}>
                    {matchedText}
                </button>
            );
        } else if (matchedText.startsWith('https://')) {
            // Создаем кнопку для ссылки
            elements.push(
                <button key={match.index} className="open-link" data-link={matchedText}>
                    {matchedText}
                </button>
            );
        } else if (matchedText === '\n') {
            // Добавляем перенос строки
            elements.push(<br key={match.index} />);
        }

        lastIndex = regex.lastIndex;
    }

    // Добавляем оставшийся текст после последнего совпадения
    if (lastIndex < description.length) {
        elements.push(description.slice(lastIndex));
    }

    return elements;
}

function FormattedText({ description }) {
    const elements = extractTagsAndLinks(description);
    return <div>{elements}</div>;
}

export default FormattedText;
