import { useRef } from "react";
import { Badge } from "./Badge";


const BadgeDisplay = () => {

    const badges = useRef([
        {
            badgeImageURL: 'https://img.shields.io/pypi/v/hedra?color=gre',
            badgeLink: 'https://pypi.org/project/hedra/',
            altText: 'Hedra PyPi Version',
            key: 'pypi-version'
        },
        {
            badgeImageURL: 'https://img.shields.io/github/license/scorbettUM/hedra',
            badgeLink: 'https://github.com/scorbettUM/hedra/blob/main/LICENSE',
            altText: 'Hedra MIT License',
            key: 'license-type'
        },
        {
            badgeImageURL: 'https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg',
            badgeLink: 'https://github.com/scorbettUM/hedra/blob/main/CODE_OF_CONDUCT.md',
            altText: 'Hedra Contributor Covenant',
            key: 'code-of-conduct-type'
        },
        {
            badgeImageURL: 'https://img.shields.io/pypi/pyversions/hedra',
            badgeLink: 'https://pypi.org/project/hedra/',
            altText: 'Supported Python Versions',
            key: 'supported-python-versions'
        }
    ]);

    return (
        <div className="w-100 h-full flex flex-row justify-center">
            {
                badges.current.map(badge => {

                    const { badgeImageURL, badgeLink, altText, key } = badge
                    return (
                        <div key={key} className="mx-2">
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