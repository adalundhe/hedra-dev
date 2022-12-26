import { useRef } from "react";
import { Badge } from "./Badge";


const BadgeDisplay = () => {

    const badges = useRef([
        {
            badgeLink: 'https://img.shields.io/pypi/pyversions/hedra?color=%23eeeeee&label=Supports%20Python&style=for-the-badge',
            label: 'python',
            value: '3.8.6+',
            key: 'supported-python-versions'
        },
        {
            badgeLink: 'https://img.shields.io/pypi/v/hedra?color=%23eeeeee&label=pypi%20version&style=for-the-badge',
            label: 'version',
            value: '0.6.21',
            key: 'pypi-version'
        },
        {
            badgeLink: 'https://img.shields.io/github/license/scorbettUM/hedra?color=%23eeeeee&label=LICENSED%20AS&logoColor=%2314151a&style=for-the-badge',
            label: 'license',
            value: 'MIT',
            key: 'license-type'
        },
    ]);

    return (
        <div className="w-full grid grid-cols-3 gap-10 px-10">
            {
                badges.current.map(badge => {

                    const { label, value, badgeLink, key } = badge
                    return (
                        <div key={key}>
                            <Badge 
                                label={label} 
                                value={value}
                                badgeLink={badgeLink} 
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