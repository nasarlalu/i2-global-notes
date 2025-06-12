export default function Loader() {
    return (
        <div className="common__loader">
            <svg viewBox="0 0 44 44">
                <rect x="2" y="2" width="12" height="12" fill="#292929">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="0s" repeatCount="indefinite">
                    </animate>
                </rect>
                <rect x="18" y="2" width="12" height="12" fill="#292929">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="0.2s" repeatCount="indefinite">
                    </animate>
                </rect>
                <rect x="34" y="2" width="12" height="12" fill="#292929">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="0.4s" repeatCount="indefinite">
                    </animate>
                </rect>
                <rect x="2" y="18" width="12" height="12" fill="#292929">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="0.6000000000000001s"
                        repeatCount="indefinite"></animate>
                </rect>
                <rect x="18" y="18" width="12" height="12" fill="#292929">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="0.8s" repeatCount="indefinite">
                    </animate>
                </rect>
                <rect x="34" y="18" width="12" height="12" fill="#292929">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="1s" repeatCount="indefinite">
                    </animate>
                </rect>
                <rect x="2" y="34" width="12" height="12" fill="#292929">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="1.2000000000000002s"
                        repeatCount="indefinite"></animate>
                </rect>
                <rect x="18" y="34" width="12" height="12" fill="#292929">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="1.4000000000000001s"
                        repeatCount="indefinite"></animate>
                </rect>
                <rect x="34" y="34" width="12" height="12" fill="#292929">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="1.6s" repeatCount="indefinite">
                    </animate>
                </rect>
            </svg>
        </div>
    )
}
