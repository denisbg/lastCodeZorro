export default function AnatomieUniverse( anatomieCord ) {
    return (
        <Container>
            <div style={{ color: '#465A61', fontSize: 48, fontFamily: 'Helvetica Neue LT Std', fontWeight: '700', lineHeight: 1, wordWrap: 'break-word' }}>Anatomie d’une chaussure</div>
            <div class="container">
                <div class="row">
                    <div class="col-3">
                        <table class="table table-image">

                            <tbody>
                                <tr>
                                    <td>
                                    </td>
                                    <td>
                                        <div style={{ width: 1000, textAlign: 'center', color: '#5D5D5D', fontSize: 15, fontFamily: 'Helvetica Neue LT Std', fontWeight: '500', lineHeight: 1, wordWrap: 'break-word' }}>
                                            <img width='480' className="z3imgbottom" src={anatomieCord} /></div>
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Container>
    )
}