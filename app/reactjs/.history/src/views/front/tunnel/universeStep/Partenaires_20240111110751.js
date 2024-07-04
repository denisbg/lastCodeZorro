import Z9part1 from '../../../../assets/images/z9partenaire_3_HOP.png'
import Z9part2 from '../../../../assets/images/z9partenaire_1_FFCM.png'
import Z9part3 from '../../../../assets/images/z9partenaire_2_Unacac.png'
export default function Partenaires() {
    return (
        <>
            <container>
                <div class="col-12">
                    <row>
                        <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 40, display: 'inline-flex' }}>
                            <div style={{ color: '#465A61', fontSize: 40, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>Nos partenaires</div>
                            <div style={{ justifyContent: 'center', alignItems: 'center', gap: 80, display: 'inline-flex' }}>
                                <img style={{ width: 100, height: 100 }} src={ Z9part1} />
                                <img style={{ width: 200, height: 69 }} src={ Z9part2 } />
                                <img style={{ width: 147, height: 104.44 }} src={ Z9part3} />
                            </div>
                        </div>
                    </row>
                </div>
            </container>
        </>
    );
}
