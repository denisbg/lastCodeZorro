import React, { useEffect, useState } from "react";


import Z7part1 from '../../../../assets/images/z9partenaire_3_HOP.png'
import Z7part2 from '../../../../assets/images/z9partenaire_1_FFCM.png'
import Z7part3 from '../../../../assets/images/z9partenaire_2_Unacac.png'

export default function Partenaires() {
    const [isLoaded, setLoaded] = React.useState(false)
    return (
        <>
            <div style={{ color: '#465A61', fontSize: 40, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 25.48, wordWrap: 'break-word' }}>Nos partenaires</div>
            <container>
                <div class="col-4">
                    <row>
                    <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 40, display: 'inline-flex' }}>
                    <div style={{ color: '#465A61', fontSize: 40, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 25.48, wordWrap: 'break-word' }}>Nos partenaires</div>
                    <div style={{ justifyContent: 'center', alignItems: 'center', gap: 80, display: 'inline-flex' }}>
                        <img style={{ width: 100, height: 100 }} src={{Z7part1}} />
                        <img style={{ width: 200, height: 69 }} src={{Z7part2}} />
                        <img style={{ width: 147, height: 104.44 }} src={{Z7part3}} />
                    </div>
                </div>
                    </row>
                </div>
               
            </container>




        </>
    );
}
