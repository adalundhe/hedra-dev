import { Section } from "../sections"


const WelcomeArticle = ({
    subSections,
    selectedSection: selectedSection, 
    selectedSubSection: selectedSubSection,
    setSelectedSection,
    setSelectedSubSection: setSelectedSubSection
}: {
    subSections?: string[],
    selectedSection?: string,
    selectedSubSection?: string,
    setSelectedSection?(sectionName: string): void,
    setSelectedSubSection?(subSectionName: string): void
}) => {

    return (
        <div className="w-full">
    {
        subSections?.map(subSectionName => 
            <Section 
                subSectionName={subSectionName}
                selectedSection={selectedSection as string}
                selectedSubSection={selectedSubSection as string}
                setSelectedSection={setSelectedSection}
                setSelectedSubSection={setSelectedSubSection}
            >
                <div>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi. Aliquet lectus proin nibh nisl condimentum. Condimentum lacinia quis vel eros. Egestas quis ipsum suspendisse ultrices gravida. Condimentum lacinia quis vel eros donec ac odio. Sed sed risus pretium quam vulputate. Imperdiet sed euismod nisi porta. Malesuada bibendum arcu vitae elementum curabitur. Velit scelerisque in dictum non consectetur a erat nam. Orci ac auctor augue mauris. Lectus quam id leo in. Vulputate ut pharetra sit amet aliquam id diam maecenas ultricies. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. Et pharetra pharetra massa massa ultricies mi quis hendrerit. Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Posuere morbi leo urna molestie at elementum eu facilisis. Lacus suspendisse faucibus interdum posuere. Nunc lobortis mattis aliquam faucibus.

Non quam lacus suspendisse faucibus interdum posuere. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. In aliquam sem fringilla ut morbi tincidunt augue. Quis viverra nibh cras pulvinar mattis nunc sed. Sodales neque sodales ut etiam sit amet nisl purus in. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Lacus laoreet non curabitur gravida arcu ac. Amet tellus cras adipiscing enim eu. Vulputate ut pharetra sit amet aliquam id diam maecenas. Suspendisse interdum consectetur libero id. Urna molestie at elementum eu facilisis sed. Vulputate sapien nec sagittis aliquam. Libero volutpat sed cras ornare arcu dui vivamus arcu felis. Urna cursus eget nunc scelerisque viverra mauris. Id diam vel quam elementum pulvinar. Semper risus in hendrerit gravida rutrum quisque non. Maecenas accumsan lacus vel facilisis volutpat est velit egestas. Blandit volutpat maecenas volutpat blandit aliquam. A condimentum vitae sapien pellentesque habitant.

Tortor pretium viverra suspendisse potenti. Volutpat diam ut venenatis tellus in metus vulputate. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. A pellentesque sit amet porttitor eget. Lectus vestibulum mattis ullamcorper velit sed ullamcorper. Nulla pellentesque dignissim enim sit amet venenatis urna cursus. Ac tortor vitae purus faucibus. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Tortor at risus viverra adipiscing at in. Facilisi etiam dignissim diam quis. Ac turpis egestas integer eget aliquet nibh praesent tristique magna.

Risus pretium quam vulputate dignissim suspendisse in est ante in. In tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Imperdiet sed euismod nisi porta lorem mollis aliquam ut. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Nunc consequat interdum varius sit. Sed enim ut sem viverra aliquet eget sit amet tellus. Nullam non nisi est sit amet. Purus in massa tempor nec feugiat nisl pretium fusce. Velit egestas dui id ornare. Quisque id diam vel quam elementum pulvinar etiam. Elit scelerisque mauris pellentesque pulvinar pellentesque. Vel pharetra vel turpis nunc eget lorem.

Enim sed faucibus turpis in eu mi bibendum neque egestas. Nunc sed augue lacus viverra vitae congue eu. Lacus luctus accumsan tortor posuere. Neque volutpat ac tincidunt vitae. Vel orci porta non pulvinar neque laoreet. Vitae auctor eu augue ut lectus arcu bibendum at varius. Massa tempor nec feugiat nisl pretium fusce. Odio ut enim blandit volutpat maecenas volutpat blandit. Turpis cursus in hac habitasse platea. Sed sed risus pretium quam. Feugiat nisl pretium fusce id. Sociis natoque penatibus et magnis dis parturient montes nascetur. Maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Vestibulum lectus mauris ultrices eros in. Sed euismod nisi porta lorem mollis. Eget dolor morbi non arcu risus quis varius quam quisque. Tincidunt id aliquet risus feugiat in. Aenean sed adipiscing diam donec adipiscing tristique risus nec feugiat. Sem viverra aliquet eget sit amet. Mauris augue neque gravida in fermentum et.

Dolor morbi non arcu risus quis varius quam quisque. A lacus vestibulum sed arcu non odio euismod lacinia at. Lectus arcu bibendum at varius vel pharetra. Ridiculus mus mauris vitae ultricies leo integer. Quis hendrerit dolor magna eget est lorem. Lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in. Maecenas sed enim ut sem viverra aliquet eget. Lectus mauris ultrices eros in cursus turpis massa tincidunt. Vel risus commodo viverra maecenas accumsan lacus. In eu mi bibendum neque egestas.

Quis viverra nibh cras pulvinar mattis. Morbi tristique senectus et netus et malesuada. A lacus vestibulum sed arcu non odio euismod lacinia. Cras semper auctor neque vitae tempus quam. Vulputate sapien nec sagittis aliquam. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Auctor urna nunc id cursus metus aliquam eleifend. Ac tortor vitae purus faucibus. Sagittis orci a scelerisque purus. Aliquam ut porttitor leo a diam sollicitudin tempor id.

Sit amet massa vitae tortor condimentum lacinia quis vel eros. Elit pellentesque habitant morbi tristique senectus et netus. Vel orci porta non pulvinar neque laoreet. Purus ut faucibus pulvinar elementum integer enim neque. Integer eget aliquet nibh praesent. Sagittis eu volutpat odio facilisis mauris sit amet. Malesuada proin libero nunc consequat interdum varius sit amet mattis. Tristique senectus et netus et malesuada fames ac. Sagittis vitae et leo duis. Imperdiet sed euismod nisi porta lorem mollis aliquam ut. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Ut lectus arcu bibendum at varius vel pharetra. Aenean sed adipiscing diam donec adipiscing tristique risus. Diam ut venenatis tellus in metus vulputate. Ultrices tincidunt arcu non sodales neque sodales ut etiam. Non consectetur a erat nam. Dis parturient montes nascetur ridiculus mus mauris. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Orci eu lobortis elementum nibh tellus molestie nunc non.

Suscipit tellus mauris a diam maecenas. Velit aliquet sagittis id consectetur purus ut faucibus pulvinar. At tellus at urna condimentum mattis. Quisque non tellus orci ac auctor augue mauris. Id velit ut tortor pretium viverra suspendisse potenti nullam ac. Id faucibus nisl tincidunt eget nullam non nisi. Est lorem ipsum dolor sit amet consectetur adipiscing elit. In ornare quam viverra orci sagittis. In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Sit amet dictum sit amet justo donec enim diam vulputate. Non quam lacus suspendisse faucibus interdum. Gravida neque convallis a cras semper auctor neque vitae tempus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Amet nisl purus in mollis nunc sed id semper. Diam quam nulla porttitor massa id neque aliquam vestibulum. Odio pellentesque diam volutpat commodo sed egestas. Luctus venenatis lectus magna fringilla urna porttitor.

Sed velit dignissim sodales ut eu sem integer vitae. Sapien eget mi proin sed libero enim sed faucibus. Placerat duis ultricies lacus sed turpis tincidunt id aliquet risus. Varius duis at consectetur lorem donec. Fames ac turpis egestas integer eget aliquet nibh. Quis enim lobortis scelerisque fermentum dui faucibus in ornare quam. In metus vulputate eu scelerisque felis imperdiet proin fermentum. Senectus et netus et malesuada fames ac turpis egestas. Malesuada proin libero nunc consequat interdum varius. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Tellus orci ac auctor augue mauris augue. Metus vulputate eu scelerisque felis imperdiet. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium.
                    </p>
                </div>
            </Section>
        )
    }
</div>
    )
}


export {
    WelcomeArticle
}