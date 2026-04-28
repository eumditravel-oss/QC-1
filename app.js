document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('qcTableBody');
    const btnAddRow = document.getElementById('btnAddRow');
    const btnExcel = document.getElementById('btnExcel');
    const btnSubmit = document.getElementById('btnSubmit');

    let rowCount = 0;

    // 초기 템플릿 데이터 설정
    const initialData = [
        { category: '계약방식', item: '프로젝트 업무 특성 파악 (구조선수행, 입찰, 본실행 등)', method: '접수자료 확인 (특이사항 작성 후 프로젝트 PM 전달)' },
        { category: '도면검토', item: '도면 접수 여부 확인', method: '도면목록표와 접수 도면상 일치 확인' },
        { category: '파일공사', item: '파일길이 및 항타장비, 동재하 정재하 시험횟수 확인', method: '지질조사도 확인' }
    ];

    // 행 생성 함수
    function createRow(category = '', item = '', method = '') {
        rowCount++;
        const formattedNumber = String(rowCount).padStart(3, '0');
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td><input type="text" value="${formattedNumber}" readonly style="text-align: center; background-color:#f9f9f9;"></td>
            <td><input type="text" value="${category}" placeholder="예: 토공사, 합벽 등"></td>
            <td><input type="text" value="${item}" placeholder="검토해야 할 항목을 입력하세요"></td>
            <td><input type="text" value="${method}" placeholder="검토 방법 및 기준을 입력하세요"></td>
            <td><button class="btn btn-delete">삭제</button></td>
        `;

        // 삭제 버튼 이벤트 리스너 추가
        tr.querySelector('.btn-delete').addEventListener('click', function() {
            tr.remove();
            updateRowNumbers();
        });

        return tr;
    }

    // 일련번호 재정렬 함수 (삭제 시 연속된 번호 유지)
    function updateRowNumbers() {
        const rows = tbody.querySelectorAll('tr');
        rowCount = 0;
        rows.forEach(row => {
            rowCount++;
            const formattedNumber = String(rowCount).padStart(3, '0');
            row.querySelector('td:first-child input').value = formattedNumber;
        });
    }

    // 초기 데이터 화면에 렌더링
    initialData.forEach(data => {
        tbody.appendChild(createRow(data.category, data.item, data.method));
    });

    // 이벤트 리스너: 행 추가 버튼 클릭 시
    btnAddRow.addEventListener('click', () => {
        tbody.appendChild(createRow());
    });

    // 이벤트 리스너: 엑셀 다운로드 버튼 클릭 시
    btnExcel.addEventListener('click', () => {
        // 실제 구현 시 라이브러리(SheetJS 등)를 사용하여 테이블 데이터를 엑셀로 변환
        alert('작성된 체크리스트와 견적조건이 엑셀(클라이언트 제출 및 보관용)로 다운로드됩니다.');
    });

    // 이벤트 리스너: PM에게 전달 버튼 클릭 시
    btnSubmit.addEventListener('click', () => {
        const confirmMsg = "작성된 QC 체크리스트를 정리하여 내부 PM 및 발주처 담당자에게 발송하시겠습니까?";
        if(confirm(confirmMsg)) {
            // 실제 구현 시 Fetch API / Axios를 통해 서버로 결재 데이터 전송
            alert("성공적으로 PM에게 인계되었습니다. (상태: Step.02 대기)");
        }
    });
});
