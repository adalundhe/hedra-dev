import { useRef } from "react";
import { Badge } from "./Badge";


const BadgeDisplay = () => {

    const badges = useRef([
        {
            badgeImageURL: 'https://img.shields.io/pypi/pyversions/hedra?color=%23eeeeee&label=Supports%20Python&style=for-the-badge',
            badgeLink: 'https://img.shields.io/pypi/pyversions/hedra?color=%23eeeeee&label=Supports%20Python&style=for-the-badge',
            altText: 'Supported Python Versions',
            key: 'supported-python-versions'
        },
        {
            badgeImageURL: 'https://img.shields.io/pypi/v/hedra?color=%23eeeeee&label=pypi%20version&style=for-the-badge',
            badgeLink: 'https://img.shields.io/pypi/v/hedra?color=%23eeeeee&label=pypi%20version&style=for-the-badge',
            altText: 'Hedra PyPi Version',
            key: 'pypi-version'
        },
        {
            badgeImageURL: 'https://img.shields.io/github/license/scorbettUM/hedra?color=%23eeeeee&label=LICENSED%20AS&logoColor=%2314151a&style=for-the-badge',
            badgeLink: 'https://img.shields.io/github/license/scorbettUM/hedra?color=%23eeeeee&label=LICENSED%20AS&logoColor=%2314151a&style=for-the-badge',
            altText: 'Hedra MIT License',
            key: 'license-type'
        },
        // {
        //     badgeImageURL: 'https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg',
        //     badgeLink: 'https://github.com/scorbettUM/hedra/blob/main/CODE_OF_CONDUCT.md',
        //     altText: 'Hedra Contributor Covenant',
        //     key: 'code-of-conduct-type'
        // },
        {
            badgeImageURL: 'https://img.shields.io/github/actions/workflow/status/scorbettUM/hedra/.github/workflows/main.yml?color=%23eeeeee&style=for-the-badge',
            badgeLink: 'https://img.shields.io/github/actions/workflow/status/scorbettUM/hedra/.github/workflows/main.yml?color=%23eeeeee&style=for-the-badge',
            altText: 'Build Status',
            key: 'build-status-versions'
        },
    ]);

    return (
        <div className="w-100 h-full grid grid-rows-4 px-10">
            {
                badges.current.map(badge => {

                    const { badgeImageURL, badgeLink, altText, key } = badge
                    return (
                        <div key={key} className="mx-2 my-2 flex justify-center shadow-2xl">
                            <Badge 
                                badgeImageURL={badgeImageURL} 
                                badgeLink={badgeLink} 
                                altText={altText}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export {
    BadgeDisplay
}