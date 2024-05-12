const sprite = `
<svg style="display:none">

    <symbol id="ico-all-tabs" viewBox="0 0 30 23">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.53333C0 0.686497 0.671573 0 1.5 0H3C3.82843 0 4.5 0.686497 4.5 1.53333V3.06667C4.5 3.9135 3.82843 4.6 3 4.6H1.5C0.671573 4.6 0 3.9135 0 3.06667V1.53333ZM7.5 2.29991C7.50005 1.45307 8.17166 0.766616 9.00009 0.766667L28.5001 0.767863C29.3285 0.767914 30 1.45445 30 2.30129C29.9999 3.14812 29.3283 3.83458 28.4999 3.83453L8.99991 3.83333C8.17148 3.83328 7.49995 3.14674 7.5 2.29991ZM0 10.7333C0 9.8865 0.671573 9.2 1.5 9.2H3C3.82843 9.2 4.5 9.8865 4.5 10.7333V12.2667C4.5 13.1135 3.82843 13.8 3 13.8H1.5C0.671573 13.8 0 13.1135 0 12.2667V10.7333ZM7.5 11.4999C7.50005 10.6531 8.17166 9.96661 9.00009 9.96667L28.5001 9.96789C29.3285 9.96795 30.0001 10.6545 30 11.5013C29.9999 12.3482 29.3283 13.0346 28.4999 13.0346L8.99991 13.0333C8.17148 13.0333 7.49995 12.3467 7.5 11.4999ZM0 19.9333C0 19.0865 0.671573 18.4 1.5 18.4H3C3.82843 18.4 4.5 19.0865 4.5 19.9333V21.4667C4.5 22.3135 3.82843 23 3 23H1.5C0.671573 23 0 22.3135 0 21.4667V19.9333ZM7.5 20.6999C7.50004 19.8531 8.17165 19.1666 9.00008 19.1667L28.5001 19.1677C29.3285 19.1678 30 19.8543 30 20.7012C30 21.548 29.3283 22.2345 28.4999 22.2344L8.99992 22.2333C8.17149 22.2333 7.49996 21.5468 7.5 20.6999Z" fill="var(--color-accent)"/>
    </symbol>

    <symbol id="ico-tabs" viewBox="0 0 84 84">
        <path d="M70.125 25.3281C77.3459 25.3281 83.2468 30.98 83.6452 38.1013L83.6666 38.8698V70.1198C83.6666 77.3407 78.0148 83.2416 70.8934 83.64L70.125 83.6614H38.875C31.654 83.6614 25.7531 78.0095 25.3548 70.8882L25.3333 70.1198V38.8698C25.3333 31.6488 30.9852 25.7479 38.1066 25.3495L38.875 25.3281H70.125ZM57.625 12.8333C63.2551 12.8333 68.0827 16.2692 70.1254 21.1585L38.875 21.1614C29.0949 21.1614 21.1667 29.0897 21.1667 38.8698L21.1669 70.1289C16.4972 68.1817 13.1513 63.6947 12.8548 58.3934L12.8333 57.625V26.375C12.8333 19.154 18.4852 13.2531 25.6066 12.8548L26.375 12.8333H57.625ZM45.125 0.333336C50.5407 0.333336 55.2139 3.51253 57.3801 8.10644L57.625 8.66667H26.375L25.4904 8.68973C16.0198 9.21788 8.66666 16.9685 8.66666 26.375L8.66689 57.6289C3.99716 55.6817 0.651321 51.1947 0.354765 45.8934L0.333328 45.125V13.875C0.333328 6.65404 5.98522 0.753145 13.1066 0.354773L13.875 0.333336H45.125Z" fill="var(--color-accent)"/>
    </symbol>

    <symbol id="ico-www" viewBox="0 0 100 100">
        <path d="M18.1461 19.5281C19.6217 20.575 21.1375 21.5719 22.7103 22.4625C21.9088 24.2625 21.1979 26.1625 20.5607 28.125H27.023C27.3919 27.1188 27.7441 26.0969 28.1632 25.1406C31.158 26.4188 34.2802 27.3938 37.4828 28.125H62.5373C65.7802 27.3906 68.9493 26.3937 71.9675 25.0875C72.3867 26.0562 72.7355 27.1 73.1178 28.125H79.4594C78.8256 26.1594 78.118 24.2656 77.3098 22.4625C78.8893 21.5719 80.4085 20.575 81.8706 19.5281C84.6876 22.0844 87.1424 24.975 89.178 28.125H98.1924C89.4597 11.5063 71.1727 0 50.0084 0C28.8373 0 10.557 11.5063 1.82769 28.125H10.8354C12.8743 24.975 15.3291 22.0781 18.1461 19.5281ZM77.1957 15.8531C76.3708 16.4031 75.5424 16.9437 74.6806 17.4437C73.6108 15.6094 72.4471 13.8688 71.1895 12.3C73.309 13.3313 75.301 14.5344 77.1957 15.8531ZM69.4322 20.0687C66.7226 21.2281 63.9324 22.1625 61.0617 22.8188C60.2602 17.4188 59.1032 12.2063 57.4566 8.21875C62.0913 10.4031 66.196 14.5469 69.4322 20.0687ZM49.398 7.43437C49.6026 7.43125 49.8005 7.40938 50.0084 7.40938C50.2163 7.40938 50.4142 7.43125 50.6187 7.43437C52.0876 9.675 53.8549 15.2687 55.1595 23.775C53.4525 23.9625 51.7355 24.0812 50.0117 24.0812C48.2779 24.0812 46.5643 23.9625 44.864 23.775C46.1618 15.2687 47.9292 9.675 49.398 7.43437ZM42.5266 8.30625C40.9001 12.2812 39.7532 17.4531 38.955 22.8219C36.128 22.1781 33.3848 21.2594 30.7287 20.1344C33.9515 14.6625 37.9993 10.5187 42.5266 8.30625ZM28.8205 12.3C27.5663 13.8688 26.4093 15.6125 25.3261 17.4437C24.4676 16.9469 23.6393 16.4062 22.8143 15.8562C24.7124 14.5344 26.7011 13.3313 28.8205 12.3Z" fill="var(--color-accent)"/>
        <path d="M81.8706 80.475C80.4018 79.425 78.8725 78.4313 77.3098 77.5344C78.1046 75.7406 78.8189 73.8406 79.4594 71.875H73.1178C72.7523 72.9 72.3934 73.9375 71.9742 74.9094C68.9527 73.6031 65.7768 72.6156 62.5407 71.875H37.4895C34.2869 72.6062 31.168 73.5844 28.1733 74.8594C27.7474 73.9 27.3986 72.875 27.0264 71.875H20.5674C21.2012 73.8406 21.9122 75.7375 22.7137 77.5375C21.1375 78.4281 19.6251 79.425 18.1495 80.4688C15.3359 77.9188 12.881 75.025 10.8488 71.875H1.83775C10.5671 88.4875 28.8474 100 50.0151 100C71.1828 100 89.4664 88.4875 98.1958 71.875H89.1814C87.1424 75.025 84.6876 77.9188 81.8706 80.475ZM22.8143 84.15C23.6393 83.6 24.471 83.0563 25.3261 82.5625C26.4093 84.3938 27.5663 86.1344 28.8205 87.7031C26.7011 86.6688 24.7124 85.4687 22.8143 84.15ZM30.722 79.8719C33.378 78.7594 36.1213 77.8313 38.9483 77.1906C39.7465 82.5625 40.8934 87.7156 42.5199 91.7063C37.9993 89.4844 33.9515 85.3344 30.722 79.8719ZM50.6187 92.5656C50.4142 92.5719 50.2163 92.5906 50.0084 92.5906C49.8005 92.5906 49.6026 92.5719 49.398 92.5656C47.9292 90.325 46.1585 84.7281 44.8573 76.225C46.5576 76.0375 48.2746 75.9156 50.005 75.9156C51.7388 75.9156 53.4525 76.0375 55.1561 76.225C53.8449 84.7281 52.0876 90.325 50.6187 92.5656ZM57.4566 91.7781C59.1033 87.7937 60.2602 82.5813 61.0617 77.1781C63.9324 77.8375 66.7226 78.7719 69.4322 79.9312C66.196 85.4562 62.0913 89.6 57.4566 91.7781ZM71.1895 87.7C72.4471 86.125 73.6108 84.3812 74.6806 82.5562C75.5424 83.0562 76.3708 83.6 77.1957 84.15C75.301 85.4687 73.309 86.6687 71.1895 87.7Z" fill="var(--color-accent)"/>
        <path d="M12.425 59.9375L14.5612 52.95C15.1279 51.0875 15.5639 49.2531 15.9563 46.7719H16.0435C16.4794 49.2094 16.8718 51.0031 17.3949 52.95L19.4004 59.9375H25.6347L32.1741 40.0781H25.6816L23.8506 47.9562C23.371 50.2344 22.935 52.4656 22.6299 54.7406H22.5427C22.1067 52.4625 21.54 50.2375 20.9732 47.9969L18.837 40.0781H13.6054L11.3384 48.2406C10.8153 50.1875 10.2049 52.4687 9.76894 54.7406H9.68175C9.33297 52.4625 8.89701 50.2688 8.46105 48.1969L6.76079 40.0687H0L6.19068 59.9344L12.425 59.9375Z" fill="var(--color-accent)"/>
        <path d="M57.7618 47.95C57.2756 50.2281 56.8496 52.4594 56.5478 54.7375H56.4573C56.0247 52.4594 55.4546 50.2313 54.8912 47.9906L52.7449 40.0719H47.5133L45.2463 48.2344C44.7232 50.1844 44.1128 52.4625 43.6768 54.7375H43.5896C43.2409 52.4594 42.8049 50.2625 42.369 48.1906L40.6687 40.0625H33.9113L40.1019 59.9281H46.3362L48.4724 52.9437C49.0392 51.0719 49.4752 49.2438 49.8675 46.7625H49.9547C50.3907 49.2 50.7864 50.9937 51.3096 52.9437L53.315 59.9281H59.5493L66.0787 40.0625H59.5795L57.7618 47.95Z" fill="var(--color-accent)"/>
        <path d="M91.6865 47.95C91.2036 50.2281 90.771 52.4594 90.4692 54.7375H90.3853C89.9527 52.4594 89.3793 50.2313 88.8125 47.9906L86.6763 40.0719H81.438L79.1676 48.2344C78.6478 50.1844 78.0341 52.4625 77.5948 54.7375H77.5143C77.1656 52.4594 76.733 50.2625 76.297 48.1906L74.5934 40.0625H67.8292L74.03 59.9281H80.2542L82.4005 52.9437C82.9639 51.0719 83.4032 49.2438 83.7956 46.7625H83.8761C84.3087 49.2 84.701 50.9937 85.2242 52.9437L87.2296 59.9281H93.4639L100 40.0625H93.5008L91.6865 47.95Z" fill="var(--color-accent)"/>
    </symbol>

    <symbol id="ico-export" viewBox="0 0 30 25">
        <path d="M12.7164 16.9063C12.9828 17.2366 13.3783 17.4542 13.8158 17.5113C14.2533 17.5685 14.6971 17.4604 15.0497 17.2109C15.2498 17.0672 15.4135 16.8836 15.5287 16.6734C15.644 16.4632 15.7081 16.2316 15.7163 15.9953V15.8828C15.5849 13.7503 16.2121 11.6373 17.4996 9.875C17.8368 9.45064 18.235 9.07205 18.6829 8.75L19.7029 10.0188C19.8869 10.2434 20.1342 10.4154 20.4169 10.5153C20.6996 10.6153 21.0064 10.6392 21.3029 10.5844C21.6081 10.5343 21.8924 10.4054 22.1238 10.2122C22.3552 10.0189 22.5245 9.76908 22.6128 9.49063L24.9361 1.99063C25.0068 1.7581 25.0189 1.51337 24.9716 1.27569C24.9242 1.03802 24.8187 0.813886 24.6633 0.620933C24.5079 0.427981 24.3068 0.271474 24.076 0.163727C23.8451 0.0559807 23.5907 -6.53011e-05 23.3328 5.70976e-08H15.0113C14.648 0.0141853 14.2984 0.134358 14.0114 0.34375C13.8055 0.493161 13.6386 0.684425 13.523 0.903125C13.3882 1.15597 13.3302 1.43874 13.3555 1.72043C13.3808 2.00212 13.4884 2.27184 13.6664 2.5L14.6863 3.76875C11.8197 5.79375 9.91645 13.1875 12.7164 16.9063Z" fill="var(--color-accent)"/>
        <path d="M29.9993 9.375C30.0021 9.42757 29.9964 9.48023 29.9827 9.53125V23.4375C29.9827 23.8519 29.8071 24.2493 29.4945 24.5424C29.182 24.8354 28.7581 25 28.316 25H1.66663C1.22461 25 0.800698 24.8354 0.488144 24.5424C0.175591 24.2493 0 23.8519 0 23.4375L0.0166663 9.375C0.0166663 9.16981 0.0597749 8.96663 0.143531 8.77706C0.227287 8.58749 0.35005 8.41524 0.504811 8.27015C0.659572 8.12505 0.843299 8.00996 1.0455 7.93144C1.24771 7.85292 1.46443 7.8125 1.6833 7.8125C1.90216 7.8125 2.11888 7.85292 2.32109 7.93144C2.52329 8.00996 2.70702 8.12505 2.86178 8.27015C3.01654 8.41524 3.1393 8.58749 3.22306 8.77706C3.30682 8.96663 3.34993 9.16981 3.34993 9.375C3.35266 9.42757 3.34704 9.48023 3.33326 9.53125V21.875H26.6494V9.375H26.6661C26.6661 8.9606 26.8417 8.56317 27.1542 8.27015C27.4668 7.97712 27.8907 7.8125 28.3327 7.8125C28.7747 7.8125 29.1986 7.97712 29.5112 8.27015C29.8237 8.56317 29.9993 8.9606 29.9993 9.375Z" fill="var(--color-accent)"/>
    </symbol>

    <symbol id="ico-import" viewBox="0 0 30 25">
        <path d="M21.6661 0C22.586 0 23.3327 0.622222 23.3327 1.38889C23.3327 1.81528 23.0993 2.21806 22.6994 2.48611L22.5994 2.54167C20.7078 3.59722 19.2895 5.14583 18.5661 6.94444C18.4062 7.39583 18.3228 7.86111 18.3162 8.33333H20.0111C20.6278 8.3375 21.1894 8.63333 21.4577 9.09722C21.7444 9.56945 21.6861 10.1319 21.3077 10.5556L16.3212 16.1111C16.0046 16.4611 15.5129 16.6667 14.9879 16.6667C14.4629 16.6667 13.9713 16.4611 13.6546 16.1111L8.66642 10.5556C8.28643 10.1333 8.2281 9.56667 8.51643 9.09722C8.79142 8.63472 9.35474 8.33889 9.97305 8.33333H11.6663C11.6663 5.34722 16.8212 0.125 21.6661 0Z" fill="var(--color-accent)"/>
        <path d="M29.9992 9.54686C30.0025 9.5994 29.9958 9.6504 29.9825 9.70139V23.4547C29.9825 24.3077 29.2358 25 28.3159 25H1.66662C0.746646 25 0 24.3077 0 23.4547L0.0166662 9.54686C0.0166662 8.99518 0.333324 8.48523 0.849976 8.20862C1.36663 7.93046 1.99994 7.93046 2.5166 8.20862C3.03325 8.48677 3.34991 8.99673 3.34991 9.54686C3.35324 9.5994 3.34657 9.6504 3.33324 9.70139V21.9094H26.6492V9.54686H26.6659C26.6659 8.69385 27.4126 8.00155 28.3325 8.00155C29.2525 8.00155 29.9992 8.69385 29.9992 9.54686Z" fill="var(--color-accent)"/>
    </symbol>

    <symbol id="ico-donate" viewBox="0 0 25 31">
        <path d="M8.11736 1.52023C10.3551 1.52023 11.3591 2.77496 11.7541 3.51206C11.8037 3.60469 11.9384 3.60451 11.9879 3.51188C12.3815 2.77479 13.38 1.52032 15.6176 1.52032C18.1666 1.52032 20.4088 3.26104 20.4088 6.43971C20.4088 7.72599 20.1467 8.82791 19.4196 10.0577C17.9376 12.5637 13.0555 15.8126 12.0527 16.4528C11.9417 16.5236 11.8015 16.5238 11.6904 16.4533C10.6867 15.8162 5.80369 12.5834 4.31018 10.0577C3.58296 8.82791 3.32275 7.72608 3.32275 6.4398C3.32266 3.26104 5.56846 1.52023 8.11736 1.52023Z" fill="transparent"/>
        <path d="M11.8712 17.8478C11.5524 17.8478 11.2414 17.7574 10.9717 17.5862C9.96429 16.9467 4.85347 13.6117 3.15583 10.7408C2.34373 9.36753 1.98154 8.04092 1.98154 6.43953C1.98154 2.32895 5.06832 0.178284 8.11754 0.178284C9.89793 0.178284 11.0954 0.824263 11.87 1.52307C12.6432 0.824263 13.839 0.178284 15.6176 0.178284C18.6651 0.178284 21.75 2.32895 21.75 6.43953C21.75 8.0387 21.3872 9.36523 20.5738 10.7408C18.889 13.5897 13.781 16.9409 12.7742 17.5838C12.5037 17.7564 12.1915 17.8478 11.8712 17.8478ZM8.11736 2.86209C6.52418 2.86209 4.66387 3.79898 4.66387 6.43971C4.66387 7.56273 4.89573 8.41301 5.46436 9.37444C6.51549 11.152 9.85195 13.6344 11.8696 14.9703C13.8874 13.6274 17.2223 11.1378 18.2652 9.37444C18.835 8.41071 19.0674 7.56042 19.0674 6.43971C19.0674 3.79898 17.209 2.86209 15.6175 2.86209C14.1614 2.86209 13.4833 3.5593 13.1708 4.1443C12.914 4.62497 12.4159 4.92341 11.8709 4.92341C11.3262 4.92341 10.8287 4.62524 10.5716 4.14554C10.2581 3.56037 9.57738 2.86209 8.11736 2.86209Z" fill="var(--color-accent)"/>
        <path d="M0.0929642 22.3347C0.0929642 21.9704 0.479963 21.7884 0.866874 21.7884H4.81528C5.19085 21.7884 5.35006 22.1869 5.35006 22.5512C5.35006 22.9724 5.15683 23.3367 4.81528 23.3367H1.86813V25.2606H3.58642C3.92779 25.2606 4.1212 25.5908 4.1212 25.9551C4.1212 26.2624 3.9619 26.6267 3.58642 26.6267H1.86813V29.5639C1.86813 29.9282 1.42434 30.1102 0.980459 30.1102C0.536579 30.1102 0.0929642 29.9282 0.0929642 29.5639V22.3347Z" fill="var(--color-accent)"/>
        <path d="M5.95369 22.3235C5.95369 22.0388 6.16987 21.7884 6.49981 21.7884H8.85539C10.4144 21.7884 11.6548 22.369 11.6548 24.2246C11.6548 25.4996 11.0744 26.2282 10.2778 26.5355L11.6662 29.0515C11.7116 29.1198 11.7231 29.1995 11.7231 29.2562C11.7231 29.7002 11.1313 30.1783 10.608 30.1783C10.3804 30.1783 10.1642 30.0872 10.039 29.8482L8.47999 26.8201H7.72903V29.5636C7.72903 29.9279 7.28524 30.11 6.84136 30.11C6.39757 30.11 5.95386 29.9279 5.95386 29.5636V22.3235H5.95369ZM7.72894 23.3364V25.4538H8.8553C9.4925 25.4538 9.8795 25.192 9.8795 24.3951C9.8795 23.5983 9.49259 23.3363 8.8553 23.3363H7.72894V23.3364Z" fill="var(--color-accent)"/>
        <path d="M14.3751 25.2603H16.0819C16.4233 25.2603 16.6167 25.5906 16.6167 25.9549C16.6167 26.2622 16.4574 26.6265 16.0819 26.6265H14.3751V28.5617H17.4246C17.766 28.5617 17.9594 28.926 17.9594 29.3472C17.9594 29.7115 17.8001 30.11 17.4246 30.11H13.3737C12.9867 30.11 12.5998 29.928 12.5998 29.5637V22.3349C12.5998 21.9706 12.9867 21.7885 13.3737 21.7885H17.4246C17.8001 21.7885 17.9594 22.187 17.9594 22.5513C17.9594 22.9725 17.7661 23.3368 17.4246 23.3368H14.3751V25.2603Z" fill="var(--color-accent)"/>
        <path d="M20.5087 25.2603H22.2156C22.5569 25.2603 22.7503 25.5906 22.7503 25.9549C22.7503 26.2622 22.591 26.6265 22.2156 26.6265H20.5087V28.5617H23.5582C23.8996 28.5617 24.093 28.926 24.093 29.3472C24.093 29.7115 23.9337 30.11 23.5582 30.11H19.5073C19.1204 30.11 18.7334 29.928 18.7334 29.5637V22.3349C18.7334 21.9706 19.1203 21.7885 19.5073 21.7885H23.5582C23.9338 21.7885 24.093 22.187 24.093 22.5513C24.093 22.9725 23.8997 23.3368 23.5582 23.3368H20.5087V25.2603Z" fill="var(--color-accent)"/>
    </symbol>

    <symbol id="ico-select" viewBox="0 0 30 30">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 18.036C2.32843 18.036 3 18.7076 3 19.536C3 21.3472 3.09901 22.7003 3.32683 23.7254C3.55086 24.7335 3.87902 25.3301 4.27447 25.7255C4.66991 26.121 5.26652 26.4491 6.27458 26.6732C7.29967 26.901 8.65277 27 10.464 27C11.2924 27 11.964 27.6716 11.964 28.5C11.964 29.3284 11.2924 30 10.464 30C8.5843 30 6.97143 29.9012 5.62372 29.6017C4.25899 29.2984 3.07597 28.7697 2.15314 27.8468C1.23031 26.924 0.701578 25.741 0.398276 24.3762C0.0987607 23.0285 0 21.4157 0 19.536C0 18.7076 0.671573 18.036 1.5 18.036Z" fill="var(--color-accent)"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M28.5 18.036C29.3284 18.036 30 18.7076 30 19.536C30 21.4157 29.9012 23.0286 29.6017 24.3763C29.2984 25.741 28.7697 26.924 27.8468 27.8468C26.924 28.7697 25.741 29.2984 24.3763 29.6017C23.0286 29.9012 21.4157 30 19.536 30C18.7076 30 18.036 29.3284 18.036 28.5C18.036 27.6716 18.7076 27 19.536 27C21.3472 27 22.7003 26.901 23.7254 26.6732C24.7335 26.4491 25.3301 26.121 25.7255 25.7255C26.121 25.3301 26.4491 24.7335 26.6732 23.7254C26.901 22.7003 27 21.3472 27 19.536C27 18.7076 27.6716 18.036 28.5 18.036Z" fill="var(--color-accent)"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.036 1.5C18.036 0.671573 18.7076 0 19.536 0C21.4157 0 23.0285 0.0987607 24.3762 0.398276C25.741 0.701578 26.924 1.23031 27.8468 2.15314C28.7697 3.07597 29.2984 4.25899 29.6017 5.62372C29.9012 6.97143 30 8.5843 30 10.464C30 11.2924 29.3284 11.964 28.5 11.964C27.6716 11.964 27 11.2924 27 10.464C27 8.65277 26.901 7.29967 26.6732 6.27458C26.4491 5.26652 26.121 4.66991 25.7255 4.27447C25.3301 3.87902 24.7335 3.55086 23.7254 3.32683C22.7003 3.09901 21.3472 3 19.536 3C18.7076 3 18.036 2.32843 18.036 1.5Z" fill="var(--color-accent)"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.32683 6.27458C3.09901 7.29967 3 8.65277 3 10.464C3 11.2924 2.32843 11.964 1.5 11.964C0.671573 11.964 0 11.2924 0 10.464C0 8.5843 0.0987606 6.97143 0.398276 5.62373C0.701578 4.25899 1.23031 3.07597 2.15314 2.15314C3.07597 1.23031 4.25899 0.701578 5.62373 0.398276C6.97143 0.0987606 8.5843 0 10.464 0C11.2924 0 11.964 0.671573 11.964 1.5C11.964 2.32843 11.2924 3 10.464 3C8.65277 3 7.29967 3.09901 6.27458 3.32683C5.26651 3.55086 4.6699 3.87902 4.27446 4.27446C3.87902 4.6699 3.55086 5.26651 3.32683 6.27458Z" fill="var(--color-accent)"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15 9.75C15.8284 9.75 16.5 10.4216 16.5 11.25V18.75C16.5 19.5784 15.8284 20.25 15 20.25C14.1716 20.25 13.5 19.5784 13.5 18.75V11.25C13.5 10.4216 14.1716 9.75 15 9.75Z" fill="var(--color-accent)"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.75 15C9.75 14.1716 10.4216 13.5 11.25 13.5H18.75C19.5784 13.5 20.25 14.1716 20.25 15C20.25 15.8284 19.5784 16.5 18.75 16.5H11.25C10.4216 16.5 9.75 15.8284 9.75 15Z" fill="var(--color-accent)"/>

    </symbol>

    <symbol id="ico-sort-alp" viewBox="0 0 30 40">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M30 40H0V35.3015H30V40Z" fill="var(--color-accent)"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 21.2061H7.5V16.5076H22.5V21.2061Z" fill="var(--color-accent)"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6456 10.8932C12.6456 10.8932 12.6456 10.8932 12.6456 10.8932L4.85436 31.3932L0.145645 29.8129L7.93689 9.31289L7.93692 9.31284C7.95905 9.25459 7.98111 9.19656 8.00308 9.13874C8.92905 6.70219 9.71187 4.64232 10.5012 3.20834C11.2241 1.89523 12.5338 0 15 0C17.4662 0 18.7759 1.89521 19.4988 3.20832C20.2881 4.64231 21.071 6.7022 21.9969 9.13878C22.0189 9.19658 22.041 9.25459 22.0631 9.31281L22.0631 9.31287L29.8544 29.8129L25.1456 31.3932L17.3544 10.8932C17.3544 10.8932 17.3544 10.8931 17.3544 10.8931C16.3446 8.23652 15.6724 6.48361 15.0577 5.36704C15.038 5.33115 15.0187 5.29676 15 5.2638C14.9813 5.29676 14.962 5.33115 14.9423 5.36704C14.3276 6.48362 13.6554 8.23654 12.6456 10.8932ZM15.4987 4.55574C15.4988 4.5567 15.491 4.56415 15.4752 4.57519C15.4908 4.56029 15.4987 4.55477 15.4987 4.55574ZM14.5248 4.57519C14.509 4.56416 14.5012 4.55671 14.5013 4.55574C14.5013 4.55477 14.5092 4.56029 14.5248 4.57519Z" fill="var(--color-accent)"/>
    </symbol>

    <symbol id="ico-this-win" viewBox="0 0 30 30">
        <path d="M25.2857 30H15C14.659 30 14.3319 29.8646 14.0909 29.6234C13.8497 29.3823 13.7143 29.0553 13.7143 28.7143C13.7143 28.3733 13.8497 28.0462 14.0909 27.8052C14.3319 27.564 14.659 27.4286 15 27.4286H25.2857C25.854 27.4286 26.3991 27.2028 26.801 26.801C27.2028 26.3991 27.4286 25.854 27.4286 25.2857V4.71429C27.4286 4.14597 27.2028 3.60093 26.801 3.19906C26.3991 2.7972 25.854 2.57143 25.2857 2.57143H4.71429C4.14597 2.57143 3.60093 2.7972 3.19906 3.19906C2.7972 3.60093 2.57143 4.14597 2.57143 4.71429V15C2.57143 15.341 2.43597 15.6681 2.19485 15.9091C1.95374 16.1503 1.6267 16.2857 1.28571 16.2857C0.944726 16.2857 0.617692 16.1503 0.376577 15.9091C0.135463 15.6681 0 15.341 0 15V4.71429C0 3.46397 0.49668 2.26488 1.38079 1.38079C2.26488 0.49668 3.46397 0 4.71429 0H25.2857C26.5359 0 27.7351 0.49668 28.6191 1.38079C29.5034 2.26488 30 3.46397 30 4.71429V25.2857C30 26.5359 29.5034 27.7351 28.6191 28.6191C27.7351 29.5034 26.5359 30 25.2857 30Z" fill="var(--color-accent)"/>
        <path d="M21.8571 16.2857C21.5175 16.2813 21.193 16.1445 20.9529 15.9043C20.7127 15.6641 20.5759 15.3396 20.5714 15V9.42857H15C14.659 9.42857 14.3319 9.2931 14.0909 9.05199C13.8497 8.81088 13.7143 8.48384 13.7143 8.14285C13.7143 7.80187 13.8497 7.47483 14.0909 7.23372C14.3319 6.9926 14.659 6.85714 15 6.85714H21.8571C22.1967 6.86158 22.5213 6.99847 22.7614 7.23862C23.0016 7.47879 23.1384 7.80324 23.1429 8.14285V15C23.1384 15.3396 23.0016 15.6641 22.7614 15.9043C22.5213 16.1445 22.1967 16.2813 21.8571 16.2857Z" fill="var(--color-accent)"/>
        <path d="M14.1429 17.1429C13.8122 17.1175 13.5045 16.9637 13.2857 16.7143C13.0749 16.4786 12.9583 16.1734 12.9583 15.8571C12.9583 15.5409 13.0749 15.2357 13.2857 15L21 7.28572C21.2438 7.05861 21.5661 6.93496 21.8991 6.94084C22.2322 6.94672 22.5501 7.08165 22.7856 7.31722C23.0211 7.55278 23.1562 7.87058 23.1621 8.20368C23.1679 8.53677 23.0443 8.85912 22.8171 9.10286L15 16.7143C14.7813 16.9637 14.4735 17.1175 14.1429 17.1429Z" fill="var(--color-accent)"/>
        <path d="M8.14286 30H3C2.20574 29.9955 1.4453 29.6781 0.883646 29.1163C0.322011 28.5547 0.00450857 27.7942 0 27V21.8571C0.00450857 21.0629 0.322011 20.3025 0.883646 19.7409C1.4453 19.1791 2.20574 18.8616 3 18.8571H8.14286C8.93712 18.8616 9.69756 19.1791 10.2592 19.7409C10.8208 20.3025 11.1384 21.0629 11.1429 21.8571V27C11.1384 27.7942 10.8208 28.5547 10.2592 29.1163C9.69756 29.6781 8.93712 29.9955 8.14286 30ZM3 21.4286C2.88634 21.4286 2.77733 21.4737 2.69695 21.5541C2.61658 21.6345 2.57143 21.7435 2.57143 21.8571V27C2.57143 27.1137 2.61658 27.2227 2.69695 27.3031C2.77733 27.3835 2.88634 27.4286 3 27.4286H8.14286C8.25651 27.4286 8.36552 27.3835 8.44591 27.3031C8.52627 27.2227 8.57143 27.1137 8.57143 27V21.8571C8.57143 21.7435 8.52627 21.6345 8.44591 21.5541C8.36552 21.4737 8.25651 21.4286 8.14286 21.4286H3Z" fill="var(--color-accent)"/>
    </symbol>

    <symbol id="ico-new-win" viewBox="0 0 30 30">
        <path d="M25.2155 29.9167H4.7012C3.45435 29.9167 2.25859 29.4215 1.37696 28.5397C0.495301 27.6581 0 26.4623 0 25.2155V4.7012C0 3.45435 0.495301 2.25859 1.37696 1.37696C2.25859 0.495301 3.45435 0 4.7012 0H14.9584C15.2984 0 15.6246 0.135087 15.8649 0.375532C16.1054 0.615977 16.2405 0.942103 16.2405 1.28214C16.2405 1.62219 16.1054 1.94831 15.8649 2.18876C15.6246 2.4292 15.2984 2.56429 14.9584 2.56429H4.7012C4.13446 2.56429 3.59093 2.78943 3.19018 3.19018C2.78943 3.59093 2.56429 4.13446 2.56429 4.7012V25.2155C2.56429 25.7822 2.78943 26.3259 3.19018 26.7266C3.59093 27.1273 4.13446 27.3524 4.7012 27.3524H25.2155C25.7822 27.3524 26.3259 27.1273 26.7266 26.7266C27.1273 26.3259 27.3524 25.7822 27.3524 25.2155V14.9584C27.3524 14.6183 27.4875 14.2922 27.728 14.0518C27.9684 13.8113 28.2945 13.6762 28.6346 13.6762C28.9746 13.6762 29.3008 13.8113 29.5411 14.0518C29.7817 14.2922 29.9167 14.6183 29.9167 14.9584V25.2155C29.9167 26.4623 29.4215 27.6581 28.5397 28.5397C27.6581 29.4215 26.4623 29.9167 25.2155 29.9167Z" fill="var(--color-accent)"/>
        <path d="M28.6346 9.4024C28.2959 9.39797 27.9723 9.26146 27.7328 9.02197C27.4933 8.78247 27.3569 8.45893 27.3524 8.12025V2.56429H21.7965C21.4564 2.56429 21.1303 2.4292 20.8899 2.18876C20.6494 1.94831 20.5143 1.62219 20.5143 1.28214C20.5143 0.942103 20.6494 0.615977 20.8899 0.375532C21.1303 0.135087 21.4564 0 21.7965 0H28.6346C28.9732 0.00442767 29.2968 0.140933 29.5363 0.380421C29.7758 0.619925 29.9123 0.943471 29.9167 1.28214V8.12025C29.9123 8.45893 29.7758 8.78247 29.5363 9.02197C29.2968 9.26146 28.9732 9.39797 28.6346 9.4024Z" fill="var(--color-accent)"/>
        <path d="M17.5227 13.6762C17.1929 13.6509 16.886 13.4976 16.6679 13.2488C16.4576 13.0138 16.3414 12.7095 16.3414 12.3941C16.3414 12.0787 16.4576 11.7744 16.6679 11.5393L27.7798 0.427378C27.8973 0.301403 28.0388 0.20037 28.1961 0.130297C28.3534 0.0602235 28.5231 0.0225455 28.6953 0.0195025C28.8674 0.0164596 29.0384 0.0481372 29.198 0.112621C29.3577 0.177104 29.5027 0.273076 29.6244 0.394829C29.7463 0.516581 29.8422 0.661601 29.9066 0.821253C29.9711 0.980906 30.0029 1.15191 29.9998 1.32406C29.9967 1.49623 29.9591 1.666 29.889 1.82327C29.8189 1.98055 29.7179 2.1221 29.5919 2.23948L18.3774 13.2488C18.1593 13.4976 17.8524 13.6509 17.5227 13.6762Z" fill="var(--color-accent)"/>
    </symbol>

    <symbol id="ico-del" viewBox="0 0 34 34">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.585786 0.585786C1.36683 -0.195262 2.63317 -0.195262 3.41421 0.585786L33.4142 30.5858C34.1953 31.3668 34.1953 32.6332 33.4142 33.4142C32.6332 34.1953 31.3668 34.1953 30.5858 33.4142L0.585786 3.41421C-0.195262 2.63317 -0.195262 1.36683 0.585786 0.585786Z" fill="var(--color-red)"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M33.4142 0.585786C34.1953 1.36683 34.1953 2.63317 33.4142 3.41421L3.41421 33.4142C2.63317 34.1953 1.36683 34.1953 0.585786 33.4142C-0.195262 32.6332 -0.195262 31.3668 0.585786 30.5858L30.5858 0.585786C31.3668 -0.195262 32.6332 -0.195262 33.4142 0.585786Z" fill="var(--color-red)"/>
    </symbol>

    <symbol id="ico-dup" viewBox="0 0 30 30">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M25.5 21H24V9C24 7.3425 22.6575 6 21 6H9V4.5C9 3.672 9.672 3 10.5 3H25.5C26.328 3 27 3.672 27 4.5V19.5C27 20.328 26.328 21 25.5 21ZM21 21H10.5C9.672 21 9 20.328 9 19.5V9H19.5C20.328 9 21 9.672 21 10.5V21ZM19.5 27H4.5C3.672 27 3 26.328 3 25.5V10.5C3 9.672 3.672 9 4.5 9H6V21C6 22.6575 7.3425 24 9 24H21V25.5C21 26.328 20.328 27 19.5 27ZM27 0H9C7.3425 0 6 1.3425 6 3V6H3C1.3425 6 0 7.3425 0 9V27C0 28.6575 1.3425 30 3 30H21C22.6575 30 24 28.6575 24 27V24H27C28.6575 24 30 22.6575 30 21V3C30 1.3425 28.6575 0 27 0Z" fill="var(--color-content)"/>
    </symbol>

    <symbol id="ico-description" viewBox="0 0 30 30">
        <path d="M21.88 26.22C21.96 26.24 22.15 26.35 22.48 26.53L27.52 29.33C27.61 29.39 27.71 29.43 27.81 29.45C27.92 29.48 28.02 29.5 28.13 29.5C28.51 29.5 28.83 29.35 29.1 29.06C29.36 28.76 29.5 28.41 29.5 28L29.5 6.39C29.5 4.27 29.34 2.86 29.02 2.16C28.8 1.68 28.52 1.26 28.19 0.9C27.88 0.55 27.51 0.26 27.1 0.03C26.47 -0.33 25.2 -0.5 23.28 -0.5L5.71 -0.5C3.79 -0.5 2.52 -0.33 1.89 0.03C1.48 0.26 1.11 0.55 0.8 0.9C0.47 1.26 0.19 1.68 -0.03 2.16C-0.35 2.86 -0.5 4.27 -0.5 6.39L-0.5 19.22C-0.5 21.35 -0.35 22.76 -0.03 23.45C0.19 23.94 0.47 24.36 0.8 24.72C1.11 25.06 1.48 25.35 1.89 25.59C2.52 25.94 3.79 26.12 5.71 26.12L20.93 26.12C21.29 26.12 21.51 26.13 21.58 26.14C21.64 26.15 21.69 26.16 21.74 26.17C21.79 26.18 21.84 26.2 21.88 26.22ZM26.77 25.55L23.71 23.85C23.27 23.61 22.96 23.45 22.76 23.38C22.62 23.33 22.49 23.28 22.35 23.25C22.22 23.21 22.1 23.19 21.97 23.17C21.76 23.14 21.42 23.12 20.93 23.12L5.71 23.12C4.23 23.12 3.37 23.05 3.14 22.92C2.99 22.83 2.86 22.73 2.74 22.61C2.61 22.46 2.5 22.3 2.41 22.1C2.28 21.83 2.22 20.87 2.22 19.22L2.22 6.39C2.22 4.74 2.28 3.78 2.41 3.51C2.5 3.32 2.61 3.15 2.74 3.01C2.86 2.89 2.99 2.78 3.14 2.7C3.37 2.56 4.23 2.5 5.71 2.5L23.28 2.5C24.76 2.5 25.62 2.56 25.85 2.7C26 2.78 26.14 2.89 26.25 3.01C26.38 3.15 26.49 3.32 26.58 3.51C26.71 3.78 26.77 4.74 26.77 6.39L26.77 25.55ZM6.92 7.93L22.07 7.93C22.83 7.93 23.43 8.59 23.43 9.43C23.43 10.27 22.83 10.93 22.07 10.93L6.92 10.93C6.16 10.93 5.56 10.27 5.56 9.43C5.56 8.59 6.16 7.93 6.92 7.93ZM6.92 14.68L22.07 14.68C22.83 14.68 23.43 15.34 23.43 16.18C23.43 17.02 22.83 17.68 22.07 17.68L6.92 17.68C6.16 17.68 5.56 17.02 5.56 16.18C5.56 15.34 6.16 14.68 6.92 14.68Z" fill="var(--color-content)" fill-opacity="1" fill-rule="evenodd"/>
    </symbol>

    <symbol id="ico-check-true" viewBox="0 0 27 27">
        <path d="M18.58 11.08L12.33 17.33C12.13 17.52 11.9 17.62 11.62 17.62C11.34 17.62 11.11 17.52 10.91 17.33L8.41 14.83C8.02 14.43 8.02 13.81 8.41 13.41C8.81 13.02 9.43 13.02 9.83 13.41L11.62 15.21L17.16 9.66C17.56 9.27 18.18 9.27 18.58 9.66C18.97 10.06 18.97 10.68 18.58 11.08Z" fill="var(--color-content)" fill-opacity="1" fill-rule="evenodd"/>
    </symbol>

    <symbol id="ico-check-false" viewBox="0 0 27 27">
        <path d="M13 -0.5C6.83 -0.5 3.03 0.2 1.62 1.62C0.2 3.03 -0.5 6.83 -0.5 13C-0.5 19.16 0.2 22.96 1.62 24.37C3.03 25.79 6.83 26.5 13 26.5C19.16 26.5 22.96 25.79 24.37 24.37C25.79 22.96 26.5 19.16 26.5 13C26.5 6.83 25.79 3.03 24.37 1.62C22.96 0.2 19.16 -0.5 13 -0.5ZM1.5 13C1.5 7.38 2.01 4.06 3.03 3.03C4.06 2.01 7.38 1.5 13 1.5C18.61 1.5 21.93 2.01 22.96 3.03C23.98 4.06 24.5 7.38 24.5 13C24.5 18.61 23.98 21.93 22.96 22.96C21.93 23.98 18.61 24.5 13 24.5C7.38 24.5 4.06 23.98 3.03 22.96C2.01 21.93 1.5 18.61 1.5 13Z" fill="var(--color-content)" fill-opacity="1" fill-rule="evenodd"/>
    </symbol>

    <symbol id="ico-no-image" viewBox="0 0 30 30">
        <path d="M28.125 3.20072L26.7993 1.875L1.875 26.7993L3.20072 28.125L5.07572 26.25H24.375C24.8721 26.2493 25.3486 26.0516 25.7001 25.7001C26.0516 25.3486 26.2493 24.8721 26.25 24.375V5.07572L28.125 3.20072ZM24.375 24.375H6.95072L14.2566 17.0691L16.4867 19.2991C16.8383 19.6507 17.3152 19.8483 17.8125 19.8483C18.3098 19.8483 18.7867 19.6507 19.1383 19.2991L20.625 17.8125L24.375 21.56V24.375ZM24.375 18.9077L21.9508 16.4834C21.5992 16.1318 21.1223 15.9342 20.625 15.9342C20.1277 15.9342 19.6508 16.1318 19.2992 16.4834L17.8125 17.9702L15.5841 15.7417L24.375 6.95072V18.9077Z" fill="var(--color-content)"/>
        <path d="M5.625 20.625V17.8125L10.3125 13.1282L11.6 14.4157L12.9274 13.0882L11.6383 11.7991C11.2867 11.4475 10.8098 11.2499 10.3125 11.2499C9.81523 11.2499 9.33832 11.4475 8.98669 11.7991L5.625 15.1609V5.625H20.625V3.75H5.625C5.12787 3.7505 4.65125 3.9482 4.29972 4.29972C3.9482 4.65125 3.7505 5.12787 3.75 5.625V20.625H5.625Z" fill="var(--color-content)"/>
    </symbol>

    <symbol id="ico-save" viewBox="0 0 30 30">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M23.4158 0C24.1391 0 24.8328 0.287332 25.3443 0.798805L29.2012 4.65574C29.7127 5.16721 30 5.8609 30 6.58422V25.9091C30 28.1685 28.1685 30 25.9091 30H4.09091C1.83157 30 0 28.1685 0 25.9091V4.09091C0 1.83157 1.83157 0 4.09091 0H23.4158ZM4.09091 2.72727C3.3378 2.72727 2.72727 3.3378 2.72727 4.09091V25.9091C2.72727 26.6622 3.3378 27.2727 4.09091 27.2727H5.45455V19.0909C5.45455 16.8315 7.28611 15 9.54545 15H20.4545C22.714 15 24.5455 16.8315 24.5455 19.0909V27.2727H25.9091C26.6622 27.2727 27.2727 26.6622 27.2727 25.9091V7.94786C27.2727 7.22453 26.9854 6.53085 26.4739 6.01938L23.9806 3.52608C23.4691 3.0146 22.7755 2.72727 22.0522 2.72727H21.8182V5.45455C21.8182 7.71389 19.9867 9.54545 17.7273 9.54545H12.2727C10.0134 9.54545 8.18182 7.71389 8.18182 5.45455V2.72727H4.09091ZM21.8182 27.2727V19.0909C21.8182 18.3378 21.2077 17.7273 20.4545 17.7273H9.54545C8.79235 17.7273 8.18182 18.3378 8.18182 19.0909V27.2727H21.8182ZM10.9091 2.72727H19.0909V5.45455C19.0909 6.20765 18.4804 6.81818 17.7273 6.81818H12.2727C11.5196 6.81818 10.9091 6.20765 10.9091 5.45455V2.72727Z" fill="var(--color-accent)"/>
    </symbol>

    <symbol id="ico-extension" viewBox="0 0 30 30">
        <path d="M6.76409e-07 28.3337V21.6668H3.33331C3.81843 21.6667 4.29768 21.5607 4.73765 21.3564C5.17762 21.152 5.56772 20.8542 5.88077 20.4837C6.19381 20.1131 6.42228 19.6788 6.55022 19.2109C6.67817 18.7431 6.70254 18.253 6.62161 17.7747C6.46109 16.9784 6.02522 16.264 5.39045 15.7569C4.75569 15.2498 3.96258 14.9823 3.15029 15.0015H6.76409e-07V8.33618C-0.000196438 8.11723 0.0427673 7.90039 0.126436 7.69804C0.210105 7.4957 0.332839 7.31183 0.487621 7.15694C0.642404 7.00205 0.826201 6.87917 1.02851 6.79534C1.23081 6.7115 1.44766 6.66835 1.66665 6.66835H8.33477V3.33569C8.33476 2.84991 8.44088 2.36999 8.64571 1.92948C8.85053 1.48898 9.14912 1.09852 9.52059 0.785399C9.89206 0.47228 10.3275 0.24406 10.7963 0.116693C11.2652 -0.0106727 11.7562 -0.034111 12.2351 0.0480172C13.0295 0.209912 13.7417 0.645706 14.2473 1.27926C14.7529 1.91282 15.0198 2.70385 15.0014 3.51417V6.66385H21.668C22.1104 6.66385 22.5347 6.83957 22.8476 7.15235C23.1604 7.46513 23.3361 7.88935 23.3361 8.33168V15.0015H26.4864C27.298 14.9834 28.09 15.2513 28.7238 15.7583C29.3577 16.2654 29.7929 16.9792 29.9533 17.7747C30.0342 18.253 30.0098 18.7431 29.8819 19.2109C29.7539 19.6788 29.5255 20.1131 29.2124 20.4837C28.8994 20.8542 28.5093 21.152 28.0693 21.3564C27.6293 21.5607 27.1501 21.6667 26.6649 21.6668H23.3361V28.3337C23.3361 28.5526 23.293 28.7694 23.2091 28.9717C23.1253 29.174 23.0024 29.3577 22.8475 29.5125C22.6925 29.6672 22.5086 29.7899 22.3063 29.8736C22.1039 29.9572 21.887 30.0002 21.668 30H16.668V26.6673C16.668 26.1816 16.5619 25.7016 16.3571 25.2611C16.1523 24.8206 15.8537 24.4302 15.4822 24.117C15.1107 23.8039 14.6753 23.5757 14.2065 23.4483C13.7376 23.321 13.2466 23.2975 12.7677 23.3797C11.9725 23.5417 11.2598 23.9781 10.754 24.6126C10.2483 25.2471 9.9819 26.0392 10.0014 26.8503V30H1.66665C1.44773 30.0002 1.23092 29.9572 1.02862 29.8736C0.826323 29.7899 0.642514 29.6672 0.487712 29.5124C0.33291 29.3576 0.210152 29.1738 0.126465 28.9716C0.042778 28.7693 -0.000196641 28.5525 6.76409e-07 28.3337Z" fill="var(--color-accent)"/>
    </symbol>

    <symbol id="ico-back" viewBox="0 0 31 24">
        <path d="M10.7408 22.7286C11.3214 23.2815 12.2401 23.2591 12.7931 22.6785C13.3461 22.098 13.3236 21.1792 12.743 20.6263L10.7408 22.7286ZM2.58175 10.9488C2.00121 10.3959 1.08237 10.4183 0.529484 10.999C-0.023426 11.5794 -0.00101337 12.4982 0.579535 13.0512L2.58175 10.9488ZM0.579535 10.9488C-0.00101337 11.5018 -0.023426 12.4206 0.529484 13.001C1.08237 13.5817 2.00121 13.6041 2.58175 13.0512L0.579535 10.9488ZM12.743 3.37375C13.3236 2.82078 13.3461 1.90201 12.7931 1.32156C12.2401 0.740911 11.3214 0.718459 10.7408 1.27143L12.743 3.37375ZM1.58064 10.5484C0.778948 10.5484 0.129032 11.1983 0.129032 12C0.129032 12.8017 0.778948 13.4516 1.58064 13.4516V10.5484ZM28.6774 13.4516C29.4791 13.4516 30.129 12.8017 30.129 12C30.129 11.1983 29.4791 10.5484 28.6774 10.5484V13.4516ZM12.743 20.6263L2.58175 10.9488L0.579535 13.0512L10.7408 22.7286L12.743 20.6263ZM2.58175 13.0512L12.743 3.37375L10.7408 1.27143L0.579535 10.9488L2.58175 13.0512ZM1.58064 13.4516L28.6774 13.4516V10.5484L1.58064 10.5484V13.4516Z" fill="var(--color-accent)"/>
    </symbol>

    <symbol id="ico-filter" viewBox="0 0 33 30">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M27.24 0H5.75C4.44 0 3.55 0.02 3.08 0.08C2.21 0.19 1.52 0.48 1.03 0.94C1.01 0.96 0.99 0.98 0.97 1.01C0.5 1.48 0.21 2.12 0.09 2.94C0.03 3.39 0 4.23 0 5.48V6.54C0 7.51 0.01 8.18 0.05 8.54C0.12 9.19 0.29 9.75 0.56 10.2C0.83 10.64 1.23 11.05 1.78 11.44C2.09 11.65 2.68 12 3.56 12.5L8.03 15.02C8.94 15.54 9.48 15.87 9.66 16.02C9.98 16.3 10.23 16.62 10.41 16.98C10.53 17.2 10.61 17.44 10.67 17.69C10.72 17.9 10.74 18.48 10.74 19.42V23.53C10.74 24.39 10.76 24.98 10.8 25.3C10.87 25.92 11.05 26.43 11.34 26.84C11.62 27.24 12.04 27.59 12.6 27.88C12.9 28.03 13.47 28.27 14.3 28.6C16.04 29.28 17.21 29.69 17.83 29.84C18.94 30.1 19.86 30.03 20.58 29.62C20.62 29.6 20.65 29.58 20.68 29.56C20.8 29.48 20.91 29.4 21.01 29.31C21.59 28.82 21.95 28.08 22.11 27.09C22.17 26.68 22.22 26.15 22.23 25.5C22.25 25.11 22.25 24.46 22.25 23.53V19.42C22.25 18.48 22.27 17.9 22.32 17.69C22.38 17.44 22.46 17.2 22.58 16.98C22.76 16.62 23.01 16.3 23.33 16.02C23.51 15.87 24.05 15.54 24.96 15.02L29.43 12.5C30.31 12 30.9 11.65 31.21 11.43C31.76 11.05 32.16 10.64 32.43 10.2C32.7 9.75 32.87 9.19 32.94 8.54C32.98 8.18 33 7.51 33 6.54V5.48C33 4.23 32.96 3.39 32.9 2.94C32.78 2.12 32.49 1.48 32.02 1.01C32 0.98 31.98 0.96 31.96 0.94C31.47 0.48 30.78 0.19 29.91 0.08C29.44 0.02 28.55 0 27.24 0ZM3.37 2.37C3.74 2.33 4.53 2.3 5.75 2.3H27.24C28.46 2.3 29.25 2.33 29.62 2.37C30 2.42 30.25 2.51 30.38 2.63C30.49 2.73 30.57 2.95 30.62 3.27C30.67 3.61 30.69 4.34 30.69 5.48V6.54C30.69 7.43 30.68 8.02 30.65 8.3C30.62 8.61 30.55 8.85 30.46 9C30.36 9.17 30.17 9.34 29.89 9.54C29.65 9.71 29.12 10.03 28.3 10.49L23.83 13.01C23.25 13.34 22.85 13.57 22.65 13.69C22.31 13.9 22.03 14.1 21.82 14.28C21.31 14.73 20.9 15.23 20.59 15.79C20.36 16.23 20.18 16.69 20.07 17.19C20.01 17.46 19.98 17.78 19.96 18.17C19.95 18.39 19.95 18.81 19.95 19.42V23.53C19.95 25.18 19.91 26.25 19.83 26.73C19.76 27.2 19.64 27.49 19.46 27.6C19.27 27.72 18.9 27.72 18.36 27.59C17.85 27.47 16.78 27.09 15.14 26.45C14.38 26.15 13.88 25.94 13.66 25.83C13.43 25.71 13.28 25.6 13.22 25.5C13.15 25.42 13.11 25.26 13.08 25.04C13.06 24.8 13.04 24.3 13.04 23.53V19.42C13.04 18.81 13.04 18.39 13.03 18.17C13.01 17.78 12.98 17.46 12.92 17.19C12.81 16.69 12.63 16.22 12.4 15.79C12.09 15.23 11.68 14.73 11.17 14.28C10.96 14.1 10.68 13.9 10.34 13.69C10.14 13.57 9.74 13.34 9.16 13.01L4.69 10.49C3.87 10.03 3.34 9.71 3.1 9.54C2.82 9.34 2.63 9.17 2.53 9C2.44 8.85 2.37 8.61 2.34 8.3C2.31 8.02 2.3 7.43 2.3 6.54V5.48C2.3 4.34 2.32 3.61 2.37 3.27C2.42 2.95 2.5 2.73 2.61 2.63C2.74 2.51 2.99 2.42 3.37 2.37Z" fill="var(--color-accent)"/>
    </symbol>

</svg>
`

document.body.insertAdjacentHTML('afterbegin', sprite);

